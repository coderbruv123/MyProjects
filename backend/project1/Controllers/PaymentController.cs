using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using DTO;
using Microsoft.EntityFrameworkCore;
using project1.Data;
using YourProject.Models;
using System.Net.Http.Headers;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IConfiguration _configuration;
            private readonly IHttpClientFactory _httpClientFactory;
    private readonly ApplicationDbContext _context;
    public PaymentController(IConfiguration configuration, ApplicationDbContext context,IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpGet("generateEsewaSignature")]
    public IActionResult GenerateEsewaSignature(decimal totalAmount, string transactionUuid, string productCode)
    {
        try
        {
            string? secretKey = _configuration["Esewa:secretKey"];

            if (string.IsNullOrEmpty(secretKey))
            {
                return BadRequest(new { error = "Esewa secret key is not configured." });
            }

            string dataToSign = $"total_amount={totalAmount},transaction_uuid={transactionUuid},product_code={productCode}";

            string signature;

            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dataToSign));
                signature = Convert.ToBase64String(hash);
            }

            return Ok(new { signature });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
        }
    }
    [HttpPost("verifyEsewaPayment")]
    public IActionResult VerifyEsewaPayment(OrderStatusDto orderstatus)


    {

        if (orderstatus == null)
        {
            return BadRequest(new { error = "Invalid order status data." });
        }
        if (string.IsNullOrEmpty(orderstatus.TransactionUuid) || string.IsNullOrEmpty(orderstatus.Transaction_code))
        {
            return BadRequest(new { error = "Transaction UUID and code are required." });
        }
        if (orderstatus.TotalAmount <= 0)
        {
            return BadRequest(new { error = "Total amount must be greater than zero." });
        }
        if (string.IsNullOrEmpty(orderstatus.ProductCode))
        {
            return BadRequest(new { error = "Product code is required." });
        }
        if (string.IsNullOrEmpty(orderstatus.Status))
        {
            return BadRequest(new { error = "Status is required." });
        }
        var order = _context.Orders.FirstOrDefault(o => o.TransactionUuid == orderstatus.TransactionUuid);
        if (order == null)
        {
            return NotFound(new { error = "Order not found." });
        }
        order.Status = orderstatus.Status;
        _context.SaveChanges();

        return Ok(new
        {
            TransactionUuid = orderstatus.TransactionUuid,
            TransactionCode = orderstatus.Transaction_code,
            Status = orderstatus.Status,
            TotalAmount = orderstatus.TotalAmount,
            ProductCode = orderstatus.ProductCode
        });

    }
    
 
        [HttpPost("initiateKhaltiPayment")]
        public async Task<IActionResult> InitiateKhaltiPayment([FromBody] KhaltiInitiateRequest request)
        {
            var khaltiSecretKey = _configuration["Khalti:SecretKey"];
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Key", khaltiSecretKey);

            var payload = new
            {
                return_url = "http://localhost:5173/khalti/success",
                website_url = "http://localhost:5173",
                amount = (int)(request.Amount * 100), // convert Rs to paisa
                purchase_order_id = request.OrderId,
                purchase_order_name = request.OrderName
            };
            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("https://khalti.com/api/v2/epayment/initiate/", content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, $"Error initiating Khalti payment: {error}");
            }

            var responseData = await response.Content.ReadFromJsonAsync<KhaltiInitiateResponse>();
            return Ok(responseData);
        }

        [HttpPost("verifyKhaltiPayment")]
        public async Task<IActionResult> VerifyKhaltiPayment([FromBody] KhaltiVerifyRequest request)
        {
            var khaltiSecretKey = _configuration["Khalti:SecretKey"];
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Key", khaltiSecretKey);

            var content = new StringContent(JsonSerializer.Serialize(new { pidx = request.pidx }), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("https://khalti.com/api/v2/payment/verify/", content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, $"Error verifying Khalti payment: {error}");
            }

            var responseData = await response.Content.ReadFromJsonAsync<KhaltiVerifyResponse>();


            return Ok(responseData);
        }
}

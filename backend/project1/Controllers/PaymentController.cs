using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{

    
    [HttpGet("generateEsewaSignature")]
    public IActionResult GenerateEsewaSignature(decimal totalAmount, string transactionUuid, string productCode)
    {
        try
        {
            string secretKey = "8gBm/:&EnhH.1/q";

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
            return StatusCode(500, new { error = "Internal server error" });
        }
    }
}

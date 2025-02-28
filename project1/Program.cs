using Microsoft.EntityFrameworkCore;
using project1.Data;
using project1.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProductDbCs")));

builder.Services.AddScoped<ILoggerServices, LoggerServices>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthentication();
app.MapControllers();

app.Run();

using PizzaAPI;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");

app.UseHttpsRedirection();

//Setting up the APIs
app.MapGet("/Pizzas", () => TaskUtils.GetPizzaSizes());//this API returns a string list of pizza sizes
app.MapGet("/Toppings", () => TaskUtils.GetToppings());//this API returns a string list of pizza toppings

//This API returns the price of the pizza
app.MapGet("/Price", (string size, string toppings) => TaskUtils.Price(size, toppings));

app.Run();

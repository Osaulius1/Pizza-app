using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace PizzaAPI
{
    public static class TaskUtils
    {
        public static List<string> GetToppings() {

            using (var toppingsDb = new ToppingsDb())
            {
                toppingsDb.Database.EnsureDeleted();
                toppingsDb.Database.EnsureCreated();

                toppingsDb.Toppings.Add(new Topping { Id = 1, Name = "Cheese" });
                toppingsDb.Toppings.Add(new Topping { Id = 2, Name = "Ham" });
                toppingsDb.Toppings.Add(new Topping { Id = 3, Name = "Olives" });
                toppingsDb.Toppings.Add(new Topping { Id = 4, Name = "Mushrooms" });
                toppingsDb.Toppings.Add(new Topping { Id = 5, Name = "Tomatoes" });
                toppingsDb.Toppings.Add(new Topping { Id = 6, Name = "Pepperoni" });
                toppingsDb.Toppings.Add(new Topping { Id = 7, Name = "Onions" });
                toppingsDb.Toppings.Add(new Topping { Id = 8, Name = "Bacon" });
                toppingsDb.Toppings.Add(new Topping { Id = 9, Name = "Spinach" });

                toppingsDb.SaveChanges();
                List<string> toppings = toppingsDb.Toppings.Select(t => t.Name).ToList();
                return toppings;
            }
        }

        public static List<PizzaSizeModel> GetPizzas() {

            using (var pizzasDb = new PizzaSizesDb())
            {
                pizzasDb.Database.EnsureDeleted();
                pizzasDb.Database.EnsureCreated();

                pizzasDb.Pizzas.Add(new PizzaSizeModel { Id = 1, size = Size.Small, price = 8m });
                pizzasDb.Pizzas.Add(new PizzaSizeModel { Id = 2, size = Size.Medium, price = 10m });
                pizzasDb.Pizzas.Add(new PizzaSizeModel { Id = 3, size = Size.Big, price = 12m });

                pizzasDb.SaveChanges();

                List <PizzaSizeModel> pizzas = pizzasDb.Pizzas.ToList();
                return pizzas;
            }
        }
        public static List<string> GetPizzaSizes() 
        {
            List<string> PizzaSizes = new List<string>();

            foreach(PizzaSizeModel pizza in GetPizzas()) 
            {
                PizzaSizes.Add(pizza.size.ToString());
            }
            return PizzaSizes;
        }
        /// <summary>
        /// This functions returns price of an order
        /// </summary>
        /// <param name="size">Size of the pizza</param>
        /// <param name="toppings">topping list written in one string separated by a space</param>
        /// <param name="toppingPrice">Price of one topping</param>
        /// <returns></returns>
        public static decimal Price(string size,string toppings) 
        {
            decimal price = 0;
            //this finds the price of the base of the pizza
            price = GetPizzas().FirstOrDefault(p => p.size.ToString() == size)?.price ?? 0m;

            
            if (toppings?.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length > 0)
            {
                //this adds toppings to the price
                price += toppings.Split(' ',StringSplitOptions.RemoveEmptyEntries).Length;
                //this adds the discount if there are more than three toppings
                if (toppings.Split(' ',StringSplitOptions.RemoveEmptyEntries).Length > 3) price *= 0.9m;
            }
            return price;
        }
            
        
    }


    
}

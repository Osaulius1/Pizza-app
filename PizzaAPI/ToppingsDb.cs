using Microsoft.EntityFrameworkCore;

namespace PizzaAPI
{
    //Topping database
    public class ToppingsDb : DbContext
    {
        public DbSet<Topping> Toppings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("ToppingsDb");
        }
    }
}

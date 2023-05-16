using Microsoft.EntityFrameworkCore;

namespace PizzaAPI
{
    public class PizzaSizesDb:DbContext
    {
        //Pizza database 
        public DbSet<PizzaSizeModel> Pizzas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("PizzaSizesDb");
        }
    }
}

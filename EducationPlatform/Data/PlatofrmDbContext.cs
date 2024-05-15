using Microsoft.EntityFrameworkCore;
using EducationPlatform.Data.Entities;
namespace EducationPlatform.Data
{
    public class PlatformDbContext : DbContext
    {
        public PlatformDbContext(DbContextOptions<PlatformDbContext> options) : base(options)
        {
        }

        public DbSet<RegistrationEntity> Register { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RegistrationEntity>().HasKey(x => x.Name);
        }
    }
}

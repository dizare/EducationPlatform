using EducationPlatform.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EducationPlatform.Data.Configurations
{
    public class RegConfigure : IEntityTypeConfiguration<RegistrationEntity>
    {
        public void Configure(EntityTypeBuilder<RegistrationEntity> builder)
        {
            builder.HasKey(x => x.Name);
            builder.Property(b => b.SecondName);
            builder.Property(b => b.Email);
            builder.Property(b => b.Password);
            
        }
    }
}
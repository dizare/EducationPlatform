using System.ComponentModel.DataAnnotations;

namespace EducationPlatform.Data.Entities
{
    public class RegistrationEntity
    {
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

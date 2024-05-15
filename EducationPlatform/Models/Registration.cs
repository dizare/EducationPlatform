using System.ComponentModel.DataAnnotations;

namespace EducationPlatform.Models
{
    public class Registration
    {
        [Required(ErrorMessage = "Имя не введено")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Фамилия не введена")]
        public string SecondName { get; set; }
        [Required(ErrorMessage = "Неправильная почта")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Неправильный пароль")]
        public string Password { get; set; }
    }
}

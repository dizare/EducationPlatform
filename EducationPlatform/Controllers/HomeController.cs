using EducationPlatform.Data.Entities;
using EducationPlatform.Data;
using EducationPlatform.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;

namespace EducationPlatform.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly PlatformDbContext _context;

        public HomeController(ILogger<HomeController> logger, PlatformDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult Send(Registration reg)
        {
            if (ModelState.IsValid)
            {
                byte[] salt = Encoding.ASCII.GetBytes("unique_salt_here");
                string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: reg.Password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));

                var registrationEntity = new RegistrationEntity
                {
                    Name = reg.Name,
                    SecondName = reg.SecondName,
                    Email = reg.Email,
                    Password = hashedPassword
                };

                _context.Register.Add(registrationEntity);
                _context.SaveChanges();

                return Redirect("/");
            }
            return View();
        }
    }
}

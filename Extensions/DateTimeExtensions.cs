using System.Runtime.CompilerServices;

namespace DatingApp.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly dob)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var age = today.Year - dob.Year;

            if(dob > today.AddYears(-age))
            {
                age--;
            }

            return age;
        }
    }
}

using NotifyService.Model;

namespace NotifyService.Services
{
    public interface IEmailService
    {
        public void SendEmail(Email request);
    }
}

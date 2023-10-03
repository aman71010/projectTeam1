using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using NotifyService.Model;
using MailKit.Net.Smtp;

namespace NotifyService.Services
{
    public class EmailService : IEmailService
    {

        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public void SendEmail(Email request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(request.emailId));
            email.Subject = request.subject;
            email.Body = new TextPart(TextFormat.Html) { Text = request.body };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);



        }
    }
}

namespace UserService.Exceptions
{
    public class PasswordNotMatchException: Exception
    {
        public PasswordNotMatchException() { }

        public PasswordNotMatchException(string message) : base(message) { }
        
    }
}

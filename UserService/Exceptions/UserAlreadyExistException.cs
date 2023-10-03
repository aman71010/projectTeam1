namespace UserService.Exceptions
{
    public class UserAlreadyExistException: Exception
    {
        public UserAlreadyExistException() { }

        public UserAlreadyExistException(string message): base(message) { }

    }
}

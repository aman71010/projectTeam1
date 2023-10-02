namespace MenuService.Exceptions
{
    public class MenuDoesNotExistException:Exception
    {
        public MenuDoesNotExistException()
        {
            
        }
        public MenuDoesNotExistException(string message):base(message) 
        {

        }
        
    }
}

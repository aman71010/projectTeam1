namespace OrderService.Excecption
{
    public class OrderAlreadyExistExcecption:Exception
    {
        public OrderAlreadyExistExcecption() 
        {
        }
        public OrderAlreadyExistExcecption(string message):base(message)
        {

        }
        

        
    }
     
}

namespace OrderService.Excecption
{
    public class OrderDoesNotExistExcecption : Exception
    {
        public OrderDoesNotExistExcecption()
        {
        }
        public OrderDoesNotExistExcecption(string message):base(message)
        { 
        
        }
        

    }
}

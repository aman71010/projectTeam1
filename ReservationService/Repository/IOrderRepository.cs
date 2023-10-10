using OrderService.Models;

namespace OrderService.Repository
{
    public interface IOrderRepository
    {
        Order GetOrder(string id);
        public List<Order> GetOrdersByEmail(string email);
        List<Order> GetAllOrders();
        void PlaceOrder(Order order);
        void CancelOrder(string id);
        void UpdateOrder(string id,Order order);

    }

}


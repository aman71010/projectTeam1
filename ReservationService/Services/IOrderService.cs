using OrderService.Models;

namespace OrderService.Services
{
    public interface IOrderService
    {
        Order GetOrder(string id);

        public List<Order> GetOrdersByEmail(string email);
        List<Order> GetAllOrders();
        void PlaceOrder(Order order);
        void CancelOrder(string id);
        void UpdateOrder(string id, Order order);
    }
}

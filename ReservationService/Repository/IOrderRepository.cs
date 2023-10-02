using OrderService.Models;

namespace OrderService.Repository
{
    public interface IOrderRepository
    {
        Order GetOrder(string id);
        Order GetOrderByEmail(string email);
        List<Order> GetAllOrders();
        void PlaceOrder(Order order);
        void CancelOrder(string id);
        void UpdateOrder(string id,Order order);

    }

}


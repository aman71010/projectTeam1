using OrderService.Excecption;
using OrderService.Models;
using OrderService.Repository;

namespace OrderService.Services
{
    public class OrderServices : IOrderService
    {
        private readonly IOrderRepository Repo;
        public OrderServices(IOrderRepository Repo)
        {
            this.Repo = Repo;
        }
        public void CancelOrder(string id)
        {
           var res =Repo.GetOrder(id);
            if (res != null) 
            {
                Repo.CancelOrder(id);
            }
            else
            {
                throw new OrderDoesNotExistExcecption($"order with id {id} does not exists");
            }
        }

        public List<Order> GetAllOrders()
        {
            return Repo.GetAllOrders();
        }

        public Order GetOrder(string id)
        {
            var res = Repo.GetOrder(id);
            if (res != null)
            {
                return Repo.GetOrder(id);
            }
            else
            {
                throw new OrderDoesNotExistExcecption($"order with id {id} does not exists");

            }
        }

        public Order GetOrderByEmail(string email)
        {
            var res = Repo.GetOrderByEmail(email);
            if (res != null)
            {
                return Repo.GetOrderByEmail(email);
            }
            else
            {
                throw new OrderDoesNotExistExcecption($"{email} does not exists");

            }
        }

        public void PlaceOrder(Order order)
        {
            var res = Repo.GetOrder(order.Order_Id);
            if (res != null)
            {
                throw new OrderAlreadyExistExcecption($"order with id {order.Order_Id} already exists");
            }
            else
            {
                Repo.PlaceOrder(order);
            }
        }

        public void UpdateOrder(string id, Order order)
        {
            var res = Repo.GetOrder(id);
            if (res != null)
            {
                Repo.UpdateOrder(id, order);
            }
            else
            {
                throw new OrderDoesNotExistExcecption($"order with id {id} does not exists");

            }
        }
    }
}

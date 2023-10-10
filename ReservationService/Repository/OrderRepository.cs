using OrderService.Models;
using MongoDB.Driver;
using System.Linq;

namespace OrderService.Repository
{
   
    public class OrderRepository : IOrderRepository
    {
        private readonly OrderDbContext context;
        public OrderRepository(OrderDbContext context) 
        {
            this.context = context;
        }
        public void CancelOrder(string id)
        {
            context.orders.DeleteOne(t=>t.Order_Id == id);     
        }

        public List<Order> GetAllOrders()
        {
            return context.orders.Find(t => true).ToList();
        }

        public Order GetOrder(string id)
        {
            return context.orders.Find(t => t.Order_Id == id).FirstOrDefault();
        }



        public List<Order> GetOrdersByEmail(string email)
        {
            return context.orders.Find(t => t.UserEmailId == email).ToList();
        }


        public void PlaceOrder(Order order)
        {
            context.orders.InsertOne(order);
        }

        public void UpdateOrder(string id, Order order)
        {
            var filter = Builders<Order>.Filter.Where(t => t.Order_Id == id);
            var update = Builders<Order>.Update.Set(t => t.Status, order.Status).
                Set(t => t.Items, order.Items);
             context.orders.UpdateOne(filter, update);
        }

       
    }
}

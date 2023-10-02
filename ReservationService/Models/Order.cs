using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace OrderService.Models
{
    public class Order
    {

        [BsonId] 
        public string Order_Id { get; set; } 

        public string UserEmailId { get; set; }
        public List<OrderItem> Items { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public enum OrderStatus
    {
        Pending,
        InProgress,
        Delivered,
        Canceled
    }
}

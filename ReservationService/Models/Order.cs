using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace OrderService.Models
{
    public class Order
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string? Order_Id { get; set; }

        [Required(ErrorMessage = "UserEmailId is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string UserEmailId { get; set; }
        public List<OrderItem> Items { get; set; }
        public decimal price { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public enum OrderStatus
    {
        Pending,
        InProgress,
        Delivered,
        Canceled,
        Completed
    }
}

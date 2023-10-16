using System;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MongoDB.Bson;

namespace SubscriptionService.Model
{
    public enum SubscriptionType
    {
        Basic,
        Silver,
        Gold
    }

    public enum PaymentStatus
    {
        Pending,
        Paid,
        Cancelled
    }

    public class Subscription
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [Required, EmailAddress]
        public string? UserId { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SubscriptionType Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PaymentStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

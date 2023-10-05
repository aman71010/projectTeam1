using System;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

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
        public int Id { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        [EmailAddress(ErrorMessage = "Invalid UserId")]
        public string? UserId { get; set; }

        [Required(ErrorMessage = "Type is required.")]
        [Range(0,2,ErrorMessage= "The field Type must be between 0 and 2")]
        public SubscriptionType Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public PaymentStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


    }
}

using MongoDB.Bson.Serialization.Attributes;

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
        public string? UserId { get; set; }
        public SubscriptionType Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public PaymentStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


    }
}

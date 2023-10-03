﻿using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace PaymentService.Models
{
    public class OrderRequest
    {
        public string OrderId { get; set; }
        public string UserName { get; set; }
        public double Amount { get; set; }
        public string Currency { get; set; }
        public string Address { get; set; }
        public string razorkey { get; set; }
    }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  items = [
   {
    imageUrl: 'https://www.cookwithnabeela.com/wp-content/uploads/2023/03/MuttonBiryani.webp',
    name:'Hyderabadi Chicken Biryani',
    description: 'Biryani decription',
    price: 220.00
   },
   {
    imageUrl: 'https://www.thespruceeats.com/thmb/D0b9aOCHPF49I-kdbi4QzB3NnVI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/thali-5392e8c7f8a24b73a68d1cc825217e79.jpg',
    name:'Thali',
    description: 'Thali decription',
    price: 320.00
   }
  
  ];

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getTax(): number {
    const taxRate = 0.18; 
    return this.getTotalPrice() * taxRate;
  }

  getSubtotal(): number {
    return this.getTotalPrice() + this.getTax();
  }
  

}

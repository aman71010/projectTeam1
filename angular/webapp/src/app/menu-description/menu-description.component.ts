import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-description',
  templateUrl: './menu-description.component.html',
  styleUrls: ['./menu-description.component.css']
})
export class MenuDescriptionComponent {
  quantity: number = 1; // Initial quantity
  cartItems: number = 0; // Initialize cart items count

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    // Add the product to the cart
    this.cartItems += this.quantity;
    alert(`Added ${this.quantity} item(s) to the cart.`);
  }

}

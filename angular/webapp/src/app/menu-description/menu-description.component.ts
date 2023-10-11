import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MenuService } from '../Services/MenuService/menu.service';
import { MenuItem } from '../Models/MenuItem';


@Component({
  selector: 'app-menu-description',
  templateUrl: './menu-description.component.html',
  styleUrls: ['./menu-description.component.css']
})
export class MenuDescriptionComponent implements OnInit {
  quantity: number = 1; // Initial quantity
  cartItems: number = 0; // Initialize cart items count

  menuItem: MenuItem = new MenuItem();

  // constructor(private menuService: MenuService, private route: ActivatedRoute) {}
  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      // this.getIdFromUrl();
  }

  // getIdFromUrl(){
  //   this.route.params.subscribe((params: Params) => {
  //     this.getMenuItemById(params['id']);
  //   })
  // }

  // getMenuItemById(id: string){
  //   this.menuService.getMenuItemById(id).subscribe((data: any) => {
  //     this.menuItem = data;
  //   });
  // }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onViewMenuDetails(id: any){
    this.router.navigate([`/checkout/${id}`]);

  }

  addToCart() {
    // Add the product to the cart
    this.cartItems += this.quantity;
    alert(`Added ${this.quantity} item(s) to the cart.`);
  }

}

import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/OrderService/order.service';
import { MenuService } from '../Services/MenuService/menu.service';
import { AuthService } from '../Services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any = [];
  p: number = 1;
  userEmail?: any;
  status:string[] = ['Pending', 'InProgress', 'Delivered', 'Canceled', 'Completed'];

  constructor(
    private orderService: OrderService,
    private menuservice: MenuService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  getImage(imageData: any) {
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit() {

    this.authService.loginUser.subscribe(user => {
      this.userEmail = user?.email;
    })

    this.orderService.getOrdersByEmail(this.userEmail).subscribe((orders: any) => {
      const orderObservables: any[] = [];
      for (const order of orders) {
        orderObservables.push(
          this.menuservice.getMenuItemById(order.items[0].menuItemId).subscribe((menuData: any) => {
            const imageData = menuData.image
            this.orders.push({
              orderData: order,
              orderImg: imageData,
            });
          })
        );
        }
    });
  }

}
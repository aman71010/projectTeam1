import { Component, OnInit } from '@angular/core';

import { Order } from '../Models/Order';
import { OrderService } from 'src/OrderService/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../Services/MenuService/menu.service';
import { Observable, map } from 'rxjs';

import { PaginatePipe } from 'ngx-pagination';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  
  order: any = ""
  orderimage: any = ""
  orderobj: any = {
  orderimg: this.orderimage, orderdata: this.order
  }
  orders: any = [];
  
  p: number = 1;
  //orders :any;

  constructor(private svc: OrderService, private menuservice: MenuService) { }

  ngOnInit() {
    
   
   /* this.svc.getOrdersByEmail("mehul@example.com").subscribe((data :any)=>
    {
      this.orders=data;
    }
    
    )*/


    /*let o :any 
    let chain: Observable<any> = this.svc.getOrdersByEmail("mehul@example.com");
    console.log(chain);
    
    chain.pipe(map((ordersResp: any) =>{
      
     for ( o in ordersResp) {

        this.orderobj.orderData = o;
        this.menuservice.getMenuItemById((o.items[0].menuItemId)).subscribe((results: any) => {

          this.orderobj.orderImg = results.image;
          this.orders.push(this.orderobj);
          console.log(this.orderobj);
        })
      }
    }))*/


    
    /*this.svc.getOrdersByEmail("mehul@example.com").subscribe((data: any) => {
      this.orders = data.map((order: any) => {
        return this.menuservice.getMenuItemById(order.items[0].menuItemId).pipe(
          map((results: any) => {
            const orderData = order;
            const orderImg = results.image;
            console.log('Order Data:', orderData);
            console.log('Order Image:', orderImg);
            return {
              orderData,
              orderImg
            };
          })
        );
      });
    });*/
  }

}
 
  


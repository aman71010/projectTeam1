import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../Models/MenuItem';
import { Order } from '../Models/Order';
import { OrderItem } from '../Models/OrderItem';
import { OrderService } from 'src/OrderService/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../Services/MenuService/menu.service';
import { Observable, map } from 'rxjs';
import { DomSanitizer ,SafeUrl} from '@angular/platform-browser';

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
  orders: any = [] ;
  menuitem:any;
  
  p: number = 1;
  //orders :any;
 
  constructor(private svc: OrderService, private menuservice: MenuService ,private sanitizer: DomSanitizer,) { }
  getImage(imageData: any)
  {                                           
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit() {
    
   
  //  this.svc.getOrdersByEmail("amangupta@gmail.com").subscribe((data :any)=>
  //   {
  //     console.log(data);
  //     this.orders=data;
  //   })
    
  //   this.menuservice.getMenuItemById("65219e923858f20a1986c9a5").subscribe((data1 :any)=>
  //   {
  //     console.log(data1);
  //     this.menuitem=data1;
  //   }
  //   )


    // let o :any 
    // let chain: Observable<any> = this.svc.getOrdersByEmail("amangupta@gmail.com");
    // console.log(chain);
    
    // chain.pipe(map((ordersResp: any) =>{
      
    //  for ( o in ordersResp) {
    //     console.log(o);
    //     this.orderobj.orderData = o;
    //     this.menuservice.getMenuItemById((o.items[0].menuItemId)).subscribe((results: any) => {

    //       this.orderobj.orderImg = results.image;
    //       this.orders.push(this.orderobj);
    //       console.log(this.orderobj);
    //     })
    //   }
    // }))


    
    // this.svc.getOrdersByEmail("use@example.com").subscribe((data: any) => {
    //   this.orders = data.map((order: any) => {
    //     return this.menuservice.getMenuItemById(order.items[0].menuItemId).pipe(
    //       map((results: any) => {
    //         const orderData = order;
    //         const orderImg = results.image;
    //         console.log('Order Data:', orderData);
    //         console.log('Order Image:', orderImg);
    //         return {
    //           orderData,
    //           orderImg
    //         };
    //       })
    //     );
    //   });
  }

}
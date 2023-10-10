import { Component, OnInit } from '@angular/core';

import { Order } from '../Models/Order';
import { OrderService } from 'src/OrderService/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders :any;

  constructor(private svc: OrderService) { }

  ngOnInit()
   {
    this.svc.getOrdersByEmail("mehul@gmail.com").subscribe((data:any)=>
    {
      console.log(data);
      this.orders=data;

    })
  }
}

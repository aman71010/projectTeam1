import { Component, OnInit } from '@angular/core';

import { Order } from '../Models/Order';
import { OrderService } from 'src/OrderService/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders :any;
  p:number =1;
 
  constructor(private svc: OrderService) { }

  ngOnInit()
   {
    this.svc.getOrdersByEmail("mehul@example.com").subscribe((data:any)=>
    {
      console.log(data);
      this.orders=data;
    })
  }
  
}

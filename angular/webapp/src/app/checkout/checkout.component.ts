import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { OrderItem } from '../Models/OrderItem';
import { Order } from '../Models/Order';
import { MenuItem } from '../Models/MenuItem';
import { MenuService } from '../Services/MenuService/menu.service';
import { CheckoutService } from '../Services/checkoutService/checkout.service';
import { AuthService } from '../Services/auth.service';
import { OrderService } from 'src/OrderService/order.service';
import { User } from '../Models/User/User';
import { UserService } from '../Services/user/user.service';
import { SubscriptionService } from '../Services/subscriptionService/subscription.service';
import { Subscription } from '../Models/Subscription';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  menuItem: MenuItem = new MenuItem();
  userEmail?: any;
  user: User = new User();
  subscriptionData:any=new Subscription();

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private orderService: OrderService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}


  getImage(imageData: any)
  {                                           
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
   
  ngOnInit(): void
  {
    this.getIdFromUrl();
    this.getUserEmail();
    this.getSubscriptionId(this.userEmail);
  }

  getUserEmail(){
    this.authService.loginUser.subscribe((userData: any) => {
      this.userEmail = userData.email;
      this.getUserDetails();
    })
  }

  getIdFromUrl()
  {
    this.route.params.subscribe((params: Params) => {
      this.getMenuItemById(params['id']);
    })
  }

  getMenuItemById(id: string)
  {
    this.menuService.getMenuItemById(id).subscribe((data: any) => {
      this.menuItem = data;
    });
  }

  getUserDetails(){
    this.userService.FetchUser(this.userEmail).subscribe((res: any) => {
      this.user = res;
    })
  }

  getSubscriptionId(userEmail:any){
    this.userEmail=userEmail;
    this.subscriptionService.getSubscriptionByUserId(userEmail).subscribe(data=>{
      this.subscriptionData=data
    })
  }

  taxRate: number = 0.18;
  taxAmount?:number;
  subtotal?:number;

  getTotal(price:any){

    if(this.subscriptionData.Type===0)
    {
      price=price-(price*0.10);
    }
   
    else if(this.subscriptionData.Type===1)
    {
      price=price-(price*0.15);
    }
  
    else if(this.subscriptionData.Type===2)
    {
      price=price-(price*0.20);
    }
    else
    {
      this.taxAmount=this.taxRate*price;
      this.subtotal=price+this.taxAmount;
    }
    this.taxAmount= Math.trunc(this.taxRate*price);
    this.subtotal= Math.trunc(price+this.taxAmount);
  }

  createOrder(){

    const orderItem: OrderItem = new OrderItem();
    const order: Order = new Order();
    order.items = [];

    orderItem.menuItemId = this.menuItem.menuItemId;
    orderItem.quantity = 1;
    orderItem.name = this.menuItem.name;

    order.userEmailId = this.userEmail;
    order.items.push(orderItem);
    order.price = this.subtotal;
    order.status = 4;
    order.createdAt = new Date();
    order.updatedAt = new Date();

    this.orderService.createOrder(order).subscribe((res:any) => {
      console.log(res);
    })

    // this.router.navigate(['order']);
  }


  proceedTopay(amount: any){
  // var:any=this.subtotal;
  // paynow()
  // {
  //   this.proceedTopay(this.var);
  // }
  // proceedTopay(amount:number){
    const RazorpayOptions={
      description:'Razorpay Payment',
      currency:'INR',
      amount: amount*100,
      name: this.menuItem.name,
      key:'rzp_test_pmZ9sPkab2DGdZ',
      image:'https://th.bing.com/th?id=OIP.t6kmiUn7cQ4NJGjHEPAOXwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      prefill:{
        name: this.user.name,
        email: this.user.userEmailId,
        phone: this.user.mobileNo
      },
      theme: {
        color :'#C21E56'
      },
      model:{
        ondismiss: () =>{
          console.log('dismissed')
        }
      },
      handler: this.createOrder()
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }
    const rzp = new Razorpay(RazorpayOptions); // Create a new Razorpay instance
    rzp.on('payment.success', successCallback); // Set the success callback
    rzp.on('payment.failed', failureCallback); // Set the failure callback
    rzp.open();

  }
}

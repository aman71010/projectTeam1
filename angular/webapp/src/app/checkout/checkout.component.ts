import { Component,OnInit} from '@angular/core';
import { MenuItem } from '../Models/MenuItem';
import { CheckoutService } from '../Services/checkoutService/checkout.service';
import { MenuService } from '../Services/MenuService/menu.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderItem } from '../Models/OrderItem';
import { Order } from '../Models/Order';
import { Subscriptiondata } from '../Models/Subscriptiondata';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  menuItem: MenuItem = new MenuItem();
 
  
  subscriptionTypes = {
    0: 'gold',
    1: 'silver',
    2: 'platinum'
  };
  
  orderItem: any = new OrderItem();
  order: any = new Order();

  constructor(private menuService: MenuService,
   private route: ActivatedRoute,
   private router: Router,
   private sanitizer: DomSanitizer,
   private orderfetch:CheckoutService, 
   private orderService:CheckoutService,

   private checkoutService: CheckoutService) {}


getImage(imageData: any)
{                                           
  const imageUrl = 'data:image/jpeg;base64,' + imageData;
  return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
   
  ngOnInit(): void
{
  this.getIdFromUrl();
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

taxRate: number = 0.18;
taxAmount?:number;
subtotal?:number;


getTotal(price:any){

  this.taxAmount=this.taxRate*price;
  this.subtotal=price+this.taxAmount;

}




createOrder(){
  this.orderItem.MenuItemId = this.menuItem.menuItemId;
  this.orderItem.Quantity = this.checkoutService.quantity;
  this.orderItem.Name = this.menuItem.name;

  this.order.Order_Id = "";
  this.order.UserEmailId = localStorage.getItem("userData.UserEmailId");
  this.order.Items.push(this.orderItem);
  this.order.price = this.subtotal;
  this.order.Status = 0;
  this.order.CreatedAt = new Date();
  this.order.UpdatedAt = new Date();

   this.orderService.createOrder(this.order).subscribe((res:any) => {
     console.log();
   })
}


proceedTopay(amount:number)
  {
    const RazorpayOptions={
      description:'Razorpay Payment',
      currency:'INR',
      amount: amount*100,
      name: this.menuItem.name,
      key:'rzp_test_pmZ9sPkab2DGdZ',
      image:'https://th.bing.com/th?id=OIP.t6kmiUn7cQ4NJGjHEPAOXwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      prefill:{
        name:'bilwaraj',
        email:'bilwa@gmail.com',
        phone: '11234567809'
      },
      theme: {
        color :'#f37254'
      },
      model:{
        ondismiss: () =>{
            console.log('dismissed')
        }
      }
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



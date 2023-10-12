import { Component } from '@angular/core';
import { SubService } from './sub-.service';

declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  constructor(private Obj : SubService){}
  order: any = {
    "email": "string",
    "phoneNumber": "string",
    "amount": 200000,
  }
 
  
  proceedTopay(amount:number)
  {
    const RazorpayOptions={
      description:'Razorpay Payment',
      currency:'INR',
      amount: amount*100,
      name: 'Luncksy',
      key:'rzp_test_pmZ9sPkab2DGdZ',
      image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ffood-delivery&psig=AOvVaw2sReYVrBuZs7ulUKL8mlqF&ust=1697090590125000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIitjKap7YEDFQAAAAAdAAAAABAE',
      prefill:{
        name:'bilwaraj',
        email:'leecopper@gmail.com',
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
      this.router.navigate(['/profile']);

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

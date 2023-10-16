import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from '../Models/Subscription';
import { AuthService } from '../Services/auth.service';
import { SubscriptionService } from '../Services/subscriptionService/subscription.service';

declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit{

  constructor(
    private subService : SubscriptionService, 
    private router: Router,
    private authService: AuthService
  ){}

  subsType = ['Basic', 'Silver','Gold'];
  paymentStatus = ['Pending', 'Paid','Cancelled'];

  userEmail?: any;
  userCurrSubscription?: any = null;
  isUserSubsrcibed: any = false;

  currSubsVal?: number;

  order: any = {
    "email": "string",
    "phoneNumber": "string",
    "amount": 200000,
  }
 
  ngOnInit(): void {
    this.getUserEmail();

    this.checkUserSubscription();
    
  }

  getUserEmail(){
    this.authService.loginUser.subscribe((userData: any) => {
      this.userEmail = userData.email;
    })
  }

  checkUserSubscription(){
    this.subService.getSubscription().subscribe((res: any) => {
      res.map((data: any) => {
        if(data.userId == this.userEmail){
          this.isUserSubsrcibed = true;
          this.userCurrSubscription = data;
        }
      })
    });
  }

  createOrUpdateSubscription() {

    if(this.isUserSubsrcibed == false){
      const subscription: Subscription = new Subscription();

      subscription.userId = this.userEmail;
      subscription.type = this.currSubsVal;
      subscription.startDate = new Date();
      subscription.endDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
      subscription.status = 1;
      subscription.createdAt = new Date();
      subscription.updatedAt = new Date();
      
      this.subService.createSubscription(subscription).subscribe((res) => {
        console.log("Subscription created:", res);
        this.checkUserSubscription();
      });
    }
    else{
      const currSubs = this.userCurrSubscription;
      currSubs.type = this.currSubsVal;
      currSubs.updatedAt = new Date();

      this.subService.updateSubscriptionByUserId(this.userEmail, currSubs).subscribe((res: any) => {
        console.log(res);
        this.checkUserSubscription();
      });
    }
  }

  proceedTopay(amount:number)
  {
    const RazorpayOptions={
      description:'Razorpay Payment',
      currency:'INR',
      amount: amount*100,
      name: 'Lunchsy',
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
      this.router.navigate(['menu']);

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

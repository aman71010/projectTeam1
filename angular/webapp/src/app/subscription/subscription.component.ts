import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from '../Models/Subscription';
import { AuthService } from '../Services/auth.service';
import { SubscriptionService } from '../Services/subscriptionService/subscription.service';
import { User } from '../Models/User/User';
import { UserService } from '../Services/user/user.service';

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
    private authService: AuthService,
    private userService: UserService
  ){}

  subsType = ['Basic', 'Silver','Gold'];
  paymentStatus = ['Pending', 'Paid','Cancelled'];

  userEmail?: any;
  userCurrSubscription?: any = null;
  isUserSubsrcibed: any = false;

  chosenSubsType?: number;
  user: User = new User();
  
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
      this.getUserDetails();
    })
  }

  getUserDetails(){
    this.userService.FetchUser(this.userEmail).subscribe((res: any) => {
      this.user = res;
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

  setChosenSubsType(type: any){
    this.chosenSubsType = type;
  }

  AlreadySubscribed(type: any){
    return (this.isUserSubsrcibed && this.userCurrSubscription.type == type && this.userCurrSubscription.endDate >= new Date());
  }

  createOrUpdateSubscription() {

    if(this.isUserSubsrcibed == false){
      const subscription: Subscription = new Subscription();

      subscription.userId = this.userEmail;
      subscription.type = this.chosenSubsType;
      subscription.startDate = new Date();
      subscription.endDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
      subscription.status = 1;
      subscription.createdAt = new Date();
      subscription.updatedAt = new Date();
      
      this.subService.createSubscription(subscription).subscribe((res) => {
        this.checkUserSubscription();
      });
    }
    else{
      const currSubs = this.userCurrSubscription;
      currSubs.type = this.chosenSubsType;
      currSubs.updatedAt = new Date();

      this.subService.updateSubscriptionByUserId(this.userEmail, currSubs).subscribe((res: any) => {
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
      handler: this.createOrUpdateSubscription()
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

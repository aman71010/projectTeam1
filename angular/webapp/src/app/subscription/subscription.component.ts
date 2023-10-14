import { Component, OnInit } from '@angular/core';
import { SubService } from './sub-.service';
import { Router } from '@angular/router';
import { Subscriptiondata } from '../Models/Subscriptiondata';
import { subscribes } from '../Models/subscribes';

declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit{

  constructor(private Obj : SubService , private router: Router ){}
  order: any = {
    "email": "string",
    "phoneNumber": "string",
    "amount": 200000,
  }

  isUserSubsrcibed: any = false;

  subscriptionList: subscribes[] = [];
 
  ngOnInit(): void {
    this.Obj.getAllSubscription().subscribe((res: any) => {
      this.subscriptionList = res;
      console.log(res);
    })
    this.checkUserSubscribed();

  }

  checkUserSubscribed(){
    const userEmail = localStorage.getItem('email');
    for(let i=0; i<this.subscriptionList.length; i++){
      if(this.subscriptionList[i].UserId === userEmail){
        this.isUserSubsrcibed = true;
      }
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

  createSubscription(option: any) {
    let subscriptionData: any = {
      UserId: 'gopisettysaikarthik9@gmail.com',
      Type: 1,
      StartDate: new Date(),
      EndData: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      Status: 1,
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    };

    this.Obj.createSubscription(subscriptionData).subscribe((res) => {
      console.log("Subscription created:", res);
    });
  }

  }

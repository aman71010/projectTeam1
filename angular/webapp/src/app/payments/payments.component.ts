import { Component, OnInit } from '@angular/core';

import { WindowService } from '../Services/Windows/window.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  constructor( private winRef: WindowService) { }

  userDat : any={userId:"", email:"", firstName:"", lastName:"", phone : ""};
  packageDat: any={PackageId : "101", PackageName :"", Speed : 0, Price: 0, Duration: 0, InstallationFee:0};
  ngOnInit()
   {
      // this.svc.getuser().subscribe((data:any)=>
      // {
      //   this.userDat=data;
      //   console.log(data);
      // });
    //  this.srvc.getpackagebyId(this.packageDat.PackageId).subscribe((data:any)=>
    //  {
    //    this.packageDat=data;
    //    console.log(data);
    //  });
   }
   
  totalPrice: number =this.packageDat.Price + this.packageDat.InstallationFee;
  orderData : any = {
    "amount" : this.totalPrice * 100, 
    "orderId" : `order_${this.userDat.email}_${this.packageDat.PackageId}`,
    "userId" : this.userDat.userId,
    "packageId" : this.packageDat.PackageId,
    "payerName" : this.userDat.firstName + this.userDat.lastName,
    "payerEmail" : this.userDat.email,
    "payerPhone" : this.userDat.phone,
    "dateTImeOfPurchase" : new Date(),
    "razorpay_payment_id" : "0",
    "razorpay_order_id" : "0",
    "razorpay_signature" : "0"
  };
   
 returnedData : any;
 pamentStatus : any;
 
Paynow(){
  // this.payment.createOrder(this.orderData).subscribe(
  //   (response : any) => {
  //     this.returnedData=response;
  //      console.log(response);
  //   },
  //   (error : Error) => {
  //     console.error('Error Creating Razorpay Order:', error);
  //   }
  // );
  this.payWithRazor(this.returnedData.Attributes.id);
}
payWithRazor(val: any) {

  const options: any = {
    key: 'rzp_test_pmZ9sPkab2DGdZ',
    amount: this.returnedData.Attributes.amount,
    currency: 'INR',
    name: 'Wi-FYI',
    description: `Purchasing Broadband plan of id${this.packageDat.packageId}`,
    image: '../../../assets/images/logo.png', // company logo or product image
    order_id: val, // order_id created by you in backend
    modal: {
      escape: false,
    },
    notes: {
    },
    theme: {
      color: '#f86e63'
    }
  };
  options.handler = ((response: any, error: any) => {
    // this.payment.validatePayment(response).subscribe();
    options.response = response;
    console.log(response);
    console.log(options);
  });

  options.modal.ondismiss = (() => {
    console.log('Transaction cancelled.');
  });

  const rzp = new this.winRef.nativeWindow.Razorpay(options);

  rzp.open();
}
}


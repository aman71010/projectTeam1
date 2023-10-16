import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private http:HttpClient) { }
  
  OrderRequest(order_data:any) : Observable<any>{
    return this.http.post('https://localhost:7205/api/Payment/CreateOrder',JSON.stringify(order_data));
  }

  getAllSubscription(){
    return this.http.get("https://localhost:7042/api/subscription/List");
  }

  getSubscriptionByUserId(UserId:string){
    return this.http.get(`https://localhost:7042/api/subscription/get/${UserId}`);
  }

  createSubscription(subscription:any){
    return this.http.post("https://localhost:7042/api/subscription/Create", subscription);
  }
}

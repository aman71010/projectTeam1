import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient:HttpClient) { }

//  OrderRequest(order_data:any) : Observable<any>{
  //  return this.httpClient.post("https://localhost:7042/api/subscription/Create",JSON.stringify(order_data));
 // } 

  createSubscription(subscriptionData: any){
    return this.httpClient.post("https://localhost:7042/api/subscription/Create", subscriptionData);
  }

  getSubscription(){
    return this.httpClient.get("https://localhost:7042/api/subscription/List");
  }

  getSubscriptionByUserId(userId: any){
    return this.httpClient.get(`https://localhost:7042/api/subscription/get/${userId}`);
  }

  updateSubscriptionByUserId(userId: any, subscription: any){
    return this.httpClient.put(`https://localhost:7042/api/subscription/update/${userId}`, subscription);
  }
 
}

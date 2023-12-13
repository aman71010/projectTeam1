import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient:HttpClient) { }

  createSubscription(subscriptionData: any){
    //return this.httpClient.post("https://localhost:7042/api/subscription/Create", subscriptionData);
    return this.httpClient.post("https://lunchsysubscriptionapi.azurewebsites.net/api/subscription/Create", subscriptionData);
  }

  getSubscription(){
    //return this.httpClient.get("https://localhost:7042/api/subscription/List");
    return this.httpClient.get("https://lunchsysubscriptionapi.azurewebsites.net/api/subscription/List");
  }

  getSubscriptionByUserId(userId: any){
    //return this.httpClient.get(`https://localhost:7042/api/subscription/get/${userId}`);
    return this.httpClient.get(`https://lunchsysubscriptionapi.azurewebsites.net/api/subscription/get/${userId}`);
  }

  updateSubscriptionByUserId(userId: any, subscription: any){
    //return this.httpClient.put(`https://localhost:7042/api/subscription/update/${userId}`, subscription);
    return this.httpClient.put(`https://lunchsysubscriptionapi.azurewebsites.net/api/subscription/update/${userId}`, subscription);
  }
 
}

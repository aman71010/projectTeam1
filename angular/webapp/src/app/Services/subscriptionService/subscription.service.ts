import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient:HttpClient) { }

  OrderRequest(order_data:any) : Observable<any>{
    return this.httpClient.post("https://localhost:7042/api/subscription/Create",JSON.stringify(order_data));
  }
}

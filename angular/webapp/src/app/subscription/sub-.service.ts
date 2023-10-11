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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrdersByEmail(email: string) {
    return this.httpClient.get(`https://localhost:7264/api/Order/getOrdersByEmail/${email}`);
  }

  createOrder(orderobj: any){
    return this.httpClient.post("https://localhost:7264/api/Order/CreateOrder",orderobj)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private svc: HttpClient) { }

  getOrdersByEmail(email: string) {
    return this.svc.get(`https://localhost:7264/api/Order/getOrdersByEmail/${email}`);
    
  }
  
}

import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient:HttpClient){}

    getMenuItembyId(id:string)
    {
      return this.httpClient.get(`https://localhost:7107/api/Menu/get/menubyid/${id}`)
    }

  
}

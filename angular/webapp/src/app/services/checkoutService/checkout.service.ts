import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { MenuItem } from 'src/app/Models/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  quantity: any;
  constructor(private httpClient:HttpClient){}

    getMenuItembyId(id:string)
    {
      return this.httpClient.get(`https://localhost:7107/api/Menu/get/menubyid/${id}`)
    }

}

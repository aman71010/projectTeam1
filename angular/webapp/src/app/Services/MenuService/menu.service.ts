import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  getAllMenuItems(){
    return this.httpClient.get("https://localhost:7107/api/Menu/get/menulist");
  }

  getMenuItemsByCategory(category: string){
    return this.httpClient.get(`https://localhost:7107/api/Menu/get/MenuByCate/${category}`);
  }

  getMenuItemById(id: string){
    return this.httpClient.get(`https://localhost:7107/api/Menu/get/menubyid/${id}`);
  }
}

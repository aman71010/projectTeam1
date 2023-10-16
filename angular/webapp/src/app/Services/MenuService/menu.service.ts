import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  token: any;
  getToken(){
    this.authService.loginUser.subscribe((data: any) => {
      this.token = data.token;
      console.log(this.token);
    })
  }

  getAllMenuItems(){
    return this.httpClient.get("https://localhost:7107/api/Menu/get/menulist");
  }

  getMenuItemsByCategory(category: string){
    return this.httpClient.get(`https://localhost:7107/api/Menu/get/MenuByCate/${category}`);
  }

  getMenuItemById(id: string){
    return this.httpClient.get(`https://localhost:7107/api/Menu/get/menubyid/${id}`);
  }

  createMenuItem(formData: any){
    return this.httpClient.post("https://localhost:7107/api/Menu/createMenu", formData);
  }

  deleteMenuItem(id: string){
    return this.httpClient.delete(`https://localhost:7107/api/Menu/DeleteMenu/${id}`);
  }
}

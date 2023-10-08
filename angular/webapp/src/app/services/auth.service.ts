import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private RegisterURL="https://localhost:7030/api/User/register"
  private LoginURL="https://localhost:7030/api/Auth/login"

  constructor(private http:HttpClient) { }

  Register(userObj:any){
    return this.http.post(this.RegisterURL,userObj)
  }
  Login(logiObj:any){
    return this.http.post(this.LoginURL,logiObj)
  }
}

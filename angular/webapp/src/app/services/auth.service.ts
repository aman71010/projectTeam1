import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private RegisterURL="https://localhost:7030/api/User/register"
  private LoginURL="https://localhost:7030/api/Auth/login"
  private forgotPasswordUrl="https://localhost:7030/api/User/update/password"
  constructor(private http:HttpClient) { }

  Register(userObj:any){
    return this.http.post(this.RegisterURL,userObj)
  }
  Login(loginObj:any){
    return this.http.post(this.LoginURL,loginObj)
  }
  ForgatePassword(user:any){
    return this.http.put(this.forgotPasswordUrl,user)
  }
}

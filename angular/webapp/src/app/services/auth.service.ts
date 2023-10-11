import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
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
  ForgotPassword(userEmailId: string, newPassword: string): Observable<any> {
    const body = { userEmailId, newPassword };
    return this.http.put(this.forgotPasswordUrl, body);
  }
 
}

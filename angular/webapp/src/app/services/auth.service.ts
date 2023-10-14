import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedUser } from '../Models/LoggedUser.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService { 


  loginUser = new BehaviorSubject<LoggedUser|null>(null);
  private tokenExpirationTimer: any;

  private RegisterURL="https://localhost:7030/api/User/register"
  private LoginURL="https://localhost:7030/api/Auth/login"
  private forgotPasswordUrl="https://localhost:7030/api/User/update/password"

  constructor(private http:HttpClient, private router: Router) { }

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

  autoLogin(){
    const temp: any = localStorage.getItem('userData');
    const userData: {
        email: string, 
        role: string, 
        _token: string, 
        _tokenExpirationDate: string
    } = JSON.parse(temp);
    if(!userData){
        return;
    }
    const lodedUser = new LoggedUser(userData.email, userData.role, userData._token, new Date(userData._tokenExpirationDate));
    if(lodedUser.token){
        this.loginUser.next(lodedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.loginUser.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
    }, expirationDuration)
  }

  handleAuthentication(email: string, role: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new LoggedUser(email, role, token, expirationDate);
    this.loginUser.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
 
}

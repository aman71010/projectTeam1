import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

import { Subscription, filter } from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from './Services/user/user.service';
import { User } from './Models/User/User';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'webapp';

  isAuthenticated?: boolean;
  private userSubs?: Subscription;
  isRegisterOrLoginPath: boolean = false;
  userType?: string;

  routes = [
    {path: 'profile', label: 'User Profile', forUserType: ['Customer', 'Admin']},
    {path: 'menu', label: 'Menus', forUserType: ['Customer', 'Admin']},
    {path: 'addmenu', label: 'Add Menu', forUserType: ['Admin']},
    {path: 'subscribe', label: 'Subscribe', forUserType: ['Customer']},
  ]

  user: User = new User();
  avatarText?: any;
  isAvatarImage?: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.authService.autoLogin();

    this.userSubs = this.authService.loginUser.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userType = user?.role;
      if(user){
        this.userService.FetchUser(user.email).subscribe((res: any) => {
          this.user = res;
          this.avatarText = `${this.user.name?.split(' ')[0][0]}${this.user.name?.split(' ')[1][0]}`
          this.isAvatarImage = this.user.userImage != null;
        })
      }
    })
    this.isLoginOrRegisterPath();
  }

  isLoginOrRegisterPath(){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        if(event.url == '/login' || event.url == '/register'){
          this.isRegisterOrLoginPath = true;
        }
      }
    })
  }

  isUserAllowed(allUserType: string[]){
    for(let i=0; i<allUserType.length; i++){
      if(allUserType[i] == this.userType)
        return true;
    }
    return false;
  }

  getImage(){
    let imageUrl: any;
    if(this.isAvatarImage){
      imageUrl = 'data:image/jpeg;base64,' + this.user.userImage;
    }
    return this.sanitizer.bypassSecurityTrustUrl(`url(${imageUrl}`);
  }

  onLogout(){
    this.authService.logout();
  }
}
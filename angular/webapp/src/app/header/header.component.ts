import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { AuthService } from '../Services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../Services/user/user.service';
import { User } from '../Models/User/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  opened?: boolean;
  isAuthenticated?: boolean;
  private userSubs?: Subscription;

  user: User = new User();
  avatarText?: any;
  isAvatarImage?: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.userSubs = this.authService.loginUser.subscribe(user => {
      this.isAuthenticated = !!user;
      if(user){
        this.userService.FetchUser(user.email).subscribe((res: any) => {
          this.user = res;
          this.avatarText = `${this.user.name?.split(' ')[0][0]}${this.user.name?.split(' ')[1][0]}`
          this.isAvatarImage = this.user.userImage != null;
        })
      }
    })
  }

  getImage(){
    const imageUrl = 'data:image/jpeg;base64,' + this.user.userImage;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getAvatarText(){
     
  }

  onLogout(){
    this.authService.logout();
  }

}


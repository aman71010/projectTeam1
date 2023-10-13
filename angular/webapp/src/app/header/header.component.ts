import { Component, OnInit } from '@angular/core';
import { SidenavbarService } from '../services/sidenavbar.service';
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

  userEmail?: string;

  avatar: any = 'AM';
  avatarText?: any;
  avatarImage?: any;

  constructor(private sideNavbarService: SidenavbarService, 
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer) {

  }

  user: any = new User();

  ngOnInit(): void {
    // const token = this.authService.GetToken();
    // if(token?.length != 0){
    //   this.userService.FetchUser().subscribe((res: any) => {
    //     this.user = res;
    //     console.log(res);
    //     this.avatarImage = this.getImage(res.user.userImage);
    //   })
    // }
    // else{
    //   this.avatarText = `${this.user.name.split(' ')[0][0]}${this.user.name.split(' ')[1][0]}`}
    // }

    // getImage(imageData: any){
    //   const imageUrl = 'data:image/jpeg;base64,' + imageData;
    //   return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    // }

    // logout(){
    //   this.authService.logout();
    // }
  }

}


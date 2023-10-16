import { Component, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Renderer2 } from '@angular/core';
import { User } from '../Models/User/User';
import { UserService } from '../Services/user/user.service';
import { Address } from '../Models/User/Address';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from "rxjs";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private el: ElementRef,private renderer: Renderer2,private Usersvc:UserService,private Authsvc:AuthService,private sanitizer: DomSanitizer,private snackBar: MatSnackBar){}

  isNameEditVisible: boolean = true;
  isMobileNoEditVisible: boolean = true;
  isAddressEditVisible: boolean = true;
  isImageEditVisible: boolean=true;
  isAddAddressVisible: boolean=true;
  isImageSelected: boolean=false;
  
  user:User=new User();
  address:Address=new Address();
  selectedFile: any;
  profileImg: any;
  Imgemail:any;

  newAdd={
    "houseNo": null,
    "landmark": null,
    "city": null,
    "state": null,
    "country": null,
    "pincode": null,
  }

  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  prevUserData:any;
  prevUserAddress:any;
  email:any;

  ngOnInit(): void {
    this.Authsvc.loginUser.subscribe(LoggedUser => {
      this.email=LoggedUser?.email;
      this.Usersvc.FetchUser(this.email).subscribe((data:any)=> {
        console.log(data);
        this.user=data;
        this.prevUserData=data;
        this.Imgemail=this.user.userEmailId;
      })
      this.Usersvc.FetchAddress(this.email).subscribe((data:any)=> {
        console.log(data);
        this.isAddressEditVisible=data?true:false;
        this.isAddAddressVisible=data?false:true;
        this.address=data;
        this.prevUserAddress=data;
      })
    })
  }


  openSnackBar(message: string){
    this.snackBar.open(message, "close", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  EditName(){
    this.isNameEditVisible=!this.isNameEditVisible;

    const element = this.el.nativeElement.querySelector('#name');
    this.renderer.setStyle(element, 'border-bottom', '2px solid #c4adad');
  }

   SaveName(form:NgForm){
    if(form.valid)
    {
      if(!this.isNameEditVisible)this.Usersvc.updateName(form.value).subscribe(
        {
          next:(res:any)=>{
            this.openSnackBar("Name Updated");
            this.prevUserData.name=this.user.name;
          },
          error:(err)=>{
            this.openSnackBar("Name Updated Failed");
            this.user.name=this.prevUserData.name;
          }
        }
      );
    }
    const element = this.el.nativeElement.querySelector('#name');
    this.renderer.setStyle(element, 'border-bottom', 'none');
    this.isNameEditVisible=!this.isNameEditVisible;
   }

  EditMobileNo(){
    this.isMobileNoEditVisible=!this.isMobileNoEditVisible;
    const element = this.el.nativeElement.querySelector('#mobileNo');
    this.renderer.setStyle(element, 'border-bottom', '2px solid #c4adad');
  }
  SaveMobileNo(form:NgForm){
    if(form.valid)
    {
      if(!this.isMobileNoEditVisible)this.Usersvc.updateMobileNo(form.value).subscribe(
        {
          next:(res:any)=>{
            this.openSnackBar("MobileNo Updated");
            this.prevUserData.mobileNo=this.user.mobileNo;
          },
          error:(err)=>{
            this.openSnackBar("MobileNo Update Failed");
            this.user.mobileNo=this.prevUserData.mobileNo;
          }
        }
      );
    }
    const element = this.el.nativeElement.querySelector('#mobileNo');
    this.renderer.setStyle(element, 'border-bottom', 'none');
    this.isMobileNoEditVisible=!this.isMobileNoEditVisible;
  }

  AddAddress(){
    this.isAddAddressVisible=!this.isAddAddressVisible;
    const addressForm = this.el.nativeElement.querySelector('#AddressForm');
    if (addressForm) {
      const inputElements = addressForm.querySelectorAll('input');
      inputElements.forEach((input: any) => {
        this.renderer.setStyle(input, 'borderBottom', '2px solid #c4adad');
      });
    }
  }

  EditAddress(){
    this.isAddressEditVisible=!this.isAddressEditVisible;
    const addressForm = this.el.nativeElement.querySelector('#AddressForm');
    if (addressForm) {
      const inputElements = addressForm.querySelectorAll('input');
      inputElements.forEach((input: any) => {
        this.renderer.setStyle(input, 'borderBottom', '2px solid #c4adad');
      });
    }
  }

  SaveAddress(form:NgForm){
    if(form.valid)
    {
      this.isAddressEditVisible=!this.isAddressEditVisible;
      this.Usersvc.updateAddrress(form.value).subscribe(
        {
          next:(res:any)=>{
            this.openSnackBar("Address Updated");
            this.prevUserAddress=this.address;
            this.user.address=form.value;
          },
          error:(err)=>{
            this.openSnackBar("Address Update Failed");
            this.address=this.prevUserAddress;
          }
        }
        );
    }
    const addressForm = this.el.nativeElement.querySelector('#AddressForm');
    if (addressForm) {
      const inputElements = addressForm.querySelectorAll('input');
      inputElements.forEach((input: any) => {
        this.renderer.setStyle(input, 'borderBottom', 'none');
      });
    }
  }

  getImage(imageData: any){                                           
    const imageUrl = 'data:image/png;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
 }

 EditImage(){
    this.isImageEditVisible=!this.isImageEditVisible;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
    this.isImageSelected=true;
    this.isImageEditVisible=!this.isImageEditVisible;
  }

  SaveImage(){
    const formData: FormData = new FormData();

    formData.append('email',this.Imgemail);
    formData.append('Img',this.selectedFile);

    this.Usersvc.updateImage(formData).subscribe(
      {
        next:(res:any)=>{
          this.openSnackBar("Image Updated");
          this.prevUserData.userImage=this.profileImg;
        },
        error:(err)=>{
          this.openSnackBar("Image Update Failed");
          this.profileImg=this.prevUserData.userImage;
        }
      }
      );
    
    this.isImageEditVisible=!this.isImageEditVisible;  
  }

  onLogout(){
    this.Authsvc.logout();
  }

}

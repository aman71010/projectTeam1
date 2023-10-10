import { Component } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Renderer2 } from '@angular/core';
import { NameUpdate } from '../Models/User/NameUpdate';
import { AddressUpdate } from '../Models/User/AddressUpdate';
import { User } from '../Models/User/User';
import { UserService } from '../Services/user/user.service';
import { MobileNoUpdate } from '../Models/User/MobileNoUpdate';
import { Address } from '../Models/User/Address';
import { ImageUpdate } from '../Models/User/ImageUpdate';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private renderer: Renderer2,private svc:UserService,private sanitizer: DomSanitizer){}

  setBorder='2px solid black';
  isNameEditVisible: boolean = true;
  isMobileNoEditVisible: boolean = true;
  isAddressEditVisible: boolean = true;
  isImageEditVisible: boolean=true;
  isAddAddressVisible: boolean=true;
  isImageSelected: boolean=false;

  updateNameObj:NameUpdate =new NameUpdate();
  updateMobileNoObj =new MobileNoUpdate();
  updateAddressObj =new AddressUpdate();
  updateImageObj =new ImageUpdate();

  user:User=new User();
  address:Address=new Address();

  // userImage: File | null = null;
  profileImg: any;

  newAdd={
    "houseNo": null,
    "landmark": null,
    "city": null,
    "state": null,
    "country": null,
    "pincode": null,
  }

  ngOnInit(){
    this.svc.FetchUser().subscribe((data:any)=> {
      console.log(data);
      // this.getImage(data.userImage);
      this.user=data;
      console.log(this.profileImg);
    })
    this.svc.FetchAddress().subscribe((data:any)=> {
      console.log(data);
      this.isAddressEditVisible=data?true:false;
      this.isAddAddressVisible=data?false:true;
      console.log(this.isAddressEditVisible);
      this.address=data;
    })
  }

  EditName(){
    this.isNameEditVisible=!this.isNameEditVisible;
  }
   SaveName(form:NgForm){
    if(form.valid)
    {
      if(!this.isNameEditVisible)this.svc.updateName(form.value).subscribe();
    }
    this.isNameEditVisible=!this.isNameEditVisible;
    console.log(form.value);
   }

  EditMobileNo(){
    this.isMobileNoEditVisible=!this.isMobileNoEditVisible;
  }
  SaveMobileNo(form:NgForm){
    if(form.valid)
    {
      if(!this.isMobileNoEditVisible)this.svc.updateMobileNo(form.value).subscribe();
    }
    console.log(form.value);
    this.isMobileNoEditVisible=!this.isMobileNoEditVisible;
  }

  AddAddress(){
    console.log(this.newAdd);
    this.isAddAddressVisible=!this.isAddAddressVisible;
  }

  EditAddress(){
    this.isAddressEditVisible=!this.isAddressEditVisible;
  }

  SaveAddress(form:NgForm){
    if(form.valid)
    {
      this.isAddressEditVisible=!this.isAddressEditVisible;
      this.svc.updateAddrress(form.value).subscribe();
    }
    console.log(form.value);
  }

  getImage(imageData: any){                                           
    const imageUrl = 'data:image/png;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
 }

 EditImage(){
    this.isImageEditVisible=!this.isImageEditVisible;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(this.profileImg);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = reader.result as string;
        console.log(this.profileImg);
      };
      reader.readAsDataURL(file);
      
      console.log(this.profileImg);
      console.log(file);
    }
    this.isImageSelected=!this.isImageSelected;
    this.isImageEditVisible=!this.isImageEditVisible;
  }

  SaveImage(form:NgForm){
    if(form.valid)
    {
      this.svc.updateImage(form.value).subscribe();
    }
    
    const file = form.value.userImage;
    console.log(this.profileImg);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        form.value.userImage = reader.result as string;
        console.log(form.value.userImage);
      };
      reader.readAsDataURL(file);
      console.log(form.value.userImage);

      this.isImageSelected=!this.isImageSelected;
      this.isImageEditVisible=!this.isImageEditVisible;
    }
  }

}

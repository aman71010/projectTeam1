import { Component, ElementRef } from '@angular/core';
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
  constructor(private el: ElementRef,private renderer: Renderer2,private svc:UserService,private sanitizer: DomSanitizer){}

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
  selectedFile: any;
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
      this.user=data;
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

    const element = this.el.nativeElement.querySelector('#name');
    this.renderer.setStyle(element, 'border-bottom', '2px solid #c4adad');
  }
   SaveName(form:NgForm){
    if(form.valid)
    {
      if(!this.isNameEditVisible)this.svc.updateName(form.value).subscribe();
    }
    const element = this.el.nativeElement.querySelector('#name');
    this.renderer.setStyle(element, 'border-bottom', 'none');
    this.isNameEditVisible=!this.isNameEditVisible;
    console.log(form.value);
   }

  EditMobileNo(){
    this.isMobileNoEditVisible=!this.isMobileNoEditVisible;
    const element = this.el.nativeElement.querySelector('#mobileNo');
    this.renderer.setStyle(element, 'border-bottom', '2px solid #c4adad');
  }
  SaveMobileNo(form:NgForm){
    if(form.valid)
    {
      if(!this.isMobileNoEditVisible)this.svc.updateMobileNo(form.value).subscribe();
    }
    console.log(form.value);
    const element = this.el.nativeElement.querySelector('#mobileNo');
    this.renderer.setStyle(element, 'border-bottom', 'none');
    this.isMobileNoEditVisible=!this.isMobileNoEditVisible;
  }

  AddAddress(){
    console.log(this.newAdd);
    this.isAddAddressVisible=!this.isAddAddressVisible;
    const elements = this.el.nativeElement.querySelector('#AddressForm input');
    elements.forEach((input: { id: any; }) => {
      const inputElement = document.querySelector(`#AddressForm #${input.id}`);
      // console.log(inputElement.id)
      // inputElement.style.borderBottom = '2px solid #c4adad';
    });
  }

  EditAddress(){
    this.isAddressEditVisible=!this.isAddressEditVisible;
    const element = this.el.nativeElement.querySelector('#AddressForm input');
    this.renderer.setStyle(element, 'border-bottom', '2px solid #c4adad');
  }

  SaveAddress(form:NgForm){
    if(form.valid)
    {
      this.isAddressEditVisible=!this.isAddressEditVisible;
      this.svc.updateAddrress(form.value).subscribe();
    }
    const element = this.el.nativeElement.querySelector('#AddressForm input');
    this.renderer.setStyle(element, 'border-bottom', 'none');
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
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
    this.isImageSelected=!this.isImageSelected;
    this.isImageEditVisible=!this.isImageEditVisible;
  }

  SaveImage(form:NgForm){
    // if(form.valid)
    // {
    //   this.svc.updateImage(form.value).subscribe();
    //   this.isImageSelected=!this.isImageSelected;
    //   this.isImageEditVisible=!this.isImageEditVisible;
    // }

    form.value.userImage=this.selectedFile;

    console.log(form.value);

    this.svc.updateImage(form.value).subscribe();

    this.isImageSelected=!this.isImageSelected;
    this.isImageEditVisible=!this.isImageEditVisible;

    
  }

}

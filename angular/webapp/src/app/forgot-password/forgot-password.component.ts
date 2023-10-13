import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
/**
 *
 */
userEmailId: string = '';
newPassword: string = '';


constructor(private auth:AuthService, private fb:FormBuilder,private router:Router) {}
  

resetPassword() {
  this.auth.ForgotPassword(this.userEmailId,this.newPassword).subscribe(
(data:any)=>{
 
  console.log(data);
  this.router.navigate(['/login'])
}
  );
    
}

}
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
responseMessage: string = '';

constructor(private auth:AuthService, private fb:FormBuilder) {}
  

resetPassword() {
  this.auth.ForgotPassword(this.userEmailId,this.newPassword).subscribe(
(data:any)=>{
  this.responseMessage=data.message;
}
  );
    
}

}
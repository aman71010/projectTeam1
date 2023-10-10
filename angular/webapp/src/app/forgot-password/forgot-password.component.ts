import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
/**
 *
 */
constructor(private auth:AuthService, private fb:FormBuilder) {}
  
EmailId= new FormControl("",Validators.required);
Password = new FormControl("", Validators.required)

}

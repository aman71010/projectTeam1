import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
/**
 *
 */
  
constructor(private auth:AuthService,private fb:FormBuilder) {}
EmailId= new FormControl("",Validators.required);
Password = new FormControl("", Validators.required)

onLogin(){
  if(this.EmailId.valid && this.Password.valid ){
    console.log(this.EmailId,this.Password)
  }
}





}

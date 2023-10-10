import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
/**
 *
 */
  
constructor(private auth:AuthService,private fb:FormBuilder,private router:Router) {}
EmailId= new FormControl("",Validators.required);
Password = new FormControl("", Validators.required)

onLogin(){
  if(this.EmailId.valid && this.Password.valid )
  {
    // console.log(this.username.value,this.password.value);
    this.auth.Login({email:this.EmailId.value,password:this.Password.value}).subscribe((data:any)=>
    {
      
      console.log(data);
    }

    );
  }

}


  
}







import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
/**
 *
 */

constructor(private fb:FormBuilder, private auth:AuthService,private router:Router){}

registerForm = this.fb.group(
  {
    name:["",Validators.required],
    email:["",Validators.required],
    mobileNo:["",Validators.required],
    password:["",Validators.required],
    confirmpassword:["",Validators.required],
    
  }
)
get name(){return this.registerForm.get("name")}
get email(){return this.registerForm.get("email")}
get mobileNo(){return this.registerForm.get("mob")}
get password(){return this.registerForm.get("pass")}
get confirmpassword(){return this.registerForm.get("password")}


onRegister()
{
  if(this.registerForm.valid){
    this.auth.Register(this.registerForm.value).subscribe((data:any)=>
    {
      this.router.navigate(['/login']);
    }
    )
  }

}
}

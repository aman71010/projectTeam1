import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from '../Services/notify.service';
import { Email } from '../Models/Email';
import { User } from '../Models/User/User';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  


  constructor(private fb:FormBuilder, private auth:AuthService,private router:Router, private notify: NotifyService,private snackBar:MatSnackBar){}

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

  sendEmail: any = new Email();
  user: User = new User();
  onRegister()
  {
    if(this.registerForm.valid){
      this.auth.Register(this.registerForm.value).subscribe({
      next: (res: any) => {
        const data: any = JSON.parse(JSON.stringify(res));
        this.user = data;
        this.sendEmail.emailId = this.user.userEmailId;
        this.sendEmail.subject = "Registered Successfully";
        this.sendEmail.body = "you have successfully registered to our application!";
        this.notify.sendEmail(this.sendEmail).subscribe((res) => {

        });

      },
      error:(err:any)=>{
        if(err.status==201) 
        {
          alert("Registration sucessfull")
          this.router.navigate(['/login'])
        }else if(err.status==409){
          alert(`User already exist`)
        }
        else{
      alert("registration failed")
        }
      }
     
    }
      );

    }

  }
 
  }

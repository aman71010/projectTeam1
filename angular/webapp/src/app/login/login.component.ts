import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private auth:AuthService,private router:Router,private snackBar: MatSnackBar) {}
  EmailId= new FormControl("",Validators.required);
  Password = new FormControl("", Validators.required)


  onLogin(){
    if(this.EmailId.valid && this.Password.valid)
    {
      this.auth.Login({email:this.EmailId.value,password:this.Password.value})
      .subscribe({
        next:(res:any)=>{
          const data: any = JSON.parse(JSON.stringify(res));
          console.log(data);
          this.auth.handleAuthentication(data.userEmail, data.role, data.token, +data.expiresIn);
          this.openSnackBar("User logged in successfully");
          this.router.navigate(['/menu']);
        },
        error:(err:any)=>{
         this.openSnackBar("Invalid credentials")
        }
      })
    }
  }

  openSnackBar(message: string){
    this.snackBar.open(message, "close", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
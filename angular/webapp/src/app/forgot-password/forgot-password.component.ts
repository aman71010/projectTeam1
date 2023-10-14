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
  userEmailId: string = '';
  newPassword: string = '';

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {}

  resetPassword() {
    if (this.userEmailId && this.newPassword) {
      this.auth.ForgotPassword(this.userEmailId, this.newPassword).subscribe(
        {
          next: (res: any) => {
            const data: any = JSON.parse(JSON.stringify(res));
            
          },
          error: (error: any) => {
         if(error.status==200){
          alert("Password updated sucessfully")
          this.router.navigate(['/login'])
         }
         else if(error.status==404){
          alert(`User with this : ${this.userEmailId}id  does not exist.`);
         }
         else{
          alert(error.message)
         }
          }
        }
      );
      }
  }
}

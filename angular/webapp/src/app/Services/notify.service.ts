import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../Models/Email';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private httpClient: HttpClient) { }

  sendEmail(emailObj: Email){
    //return this.httpClient.post("https://localhost:7024/Email/SendEMail", emailObj);
    return this.httpClient.post("http://localhost:8085/Email/SendEMail", emailObj);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../../Models/User/User';
import { NameUpdate } from '../../Models/User/NameUpdate';
import { MobileNoUpdate } from '../../Models/User/MobileNoUpdate';
import { AddressUpdate } from '../../Models/User/AddressUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpsvc:HttpClient) { }

  FetchUser(email: string){
    return this.httpsvc.get(`https://localhost:7030/api/User/get/${email}`);
  }

  FetchAddress(email:string){
    return this.httpsvc.get(`https://localhost:7030/api/User/get/address/${email}`);
  }

  updateName(updateNameobj:NameUpdate)
  {
    return this.httpsvc.put("https://localhost:7030/api/User/update/name",updateNameobj);
  }

  updateMobileNo(updateMobileNoobj:MobileNoUpdate)
  {
    return this.httpsvc.put("https://localhost:7030/api/User/update/number",updateMobileNoobj);
  }

  updateAddrress(updateAddressobj:AddressUpdate)
  {
    return this.httpsvc.put("https://localhost:7030/api/User/update/Address",updateAddressobj);
  }

  updateImage(formData: any)
  {
    return this.httpsvc.put("https://localhost:7030/api/User/update/image",formData);
  }

  GetUserByEmail(email: any){
    return this.httpsvc.get(`https://localhost:7030/api/User/get/${email}`);
  }
  
}

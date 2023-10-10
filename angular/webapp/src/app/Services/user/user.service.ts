import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../../Models/User/User';
import { NameUpdate } from '../../Models/User/NameUpdate';
import { MobileNoUpdate } from '../../Models/User/MobileNoUpdate';
import { AddressUpdate } from '../../Models/User/AddressUpdate';
import { ImageUpdate } from '../../Models/User/ImageUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpsvc:HttpClient) { }

  FetchUser(){
    return this.httpsvc.get("https://localhost:7030/api/User/get/aman%40gmail.com");
  }

  FetchAddress(){
    return this.httpsvc.get("https://localhost:7030/api/User/get/address/aman%40gmail.com");
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

  updateImage(updateImageobj:ImageUpdate)
  {
    return this.httpsvc.put("https://localhost:7030/api/User/update/image",updateImageobj);
  }
  
}

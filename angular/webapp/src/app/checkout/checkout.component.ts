import { Component,OnInit} from '@angular/core';
import { MenuItem } from '../Models/MenuItem';
import { CheckoutService } from '../services/checkoutService/checkout.service';
import { MenuService } from '../services/MenuService/menu.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  menuItem: MenuItem = new MenuItem();
  constructor(private menuService: MenuService, private route: ActivatedRoute,
              private router: Router,private sanitizer: DomSanitizer) {}


     getImage(imageData: any){                                           // imageData --> byte[]
      const imageUrl = 'data:image/jpeg;base64,' + imageData;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
   }
   
  ngOnInit(): void {
    this.getIdFromUrl();
}

getIdFromUrl(){
  this.route.params.subscribe((params: Params) => {
    this.getMenuItemById(params['id']);
  })
}

getMenuItemById(id: string){
  this.menuService.getMenuItemById(id).subscribe((data: any) => {
    this.menuItem = data;
  });
}

taxRate: number = 0.10;

proceedTopay()
  {

  }

 
  
  

  



  

  


  

}

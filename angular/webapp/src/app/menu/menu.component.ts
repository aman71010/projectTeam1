import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { MenuItem } from '../Models/MenuItem';
import { MenuService } from '../Services/MenuService/menu.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  activeCategory?: number;

  categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Breakfast"},
    { id: 3, name: "Lunch"},
    { id: 4, name: "Dinner"},
    { id: 5, name: "Veg"},
    { id: 6, name: "Non veg"},
  ]

  menuItem: MenuItem = new MenuItem();
  menuList: MenuItem[] = [];
  p: number = 1;
  userType?: string;

  constructor(
    private menuService: MenuService, 
    private router: Router, 
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) { }

  getImage(imageData: any){
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit(): void {
    this.getAllMenuItems();
    this.getUserRole();
  }

  getAllMenuItems(){
    this.activeCategory = 1;
    this.menuService.getAllMenuItems().subscribe((data: any) => {
      this.menuList = data;
    });
  }

  getMenuItemsByCategory(id: number, category: string){
    this.activeCategory = id;
    if(id === 1){
      this.getAllMenuItems();
    }
    else{
      this.menuService.getMenuItemsByCategory(category).subscribe((data: any) => {
        this.menuList = data;
      })
    }
  }
  
  getUserRole(){
    this.authService.loginUser.subscribe(user => {
      this.userType = user?.role;
    })
  }

  onDeleteMenuItem(id: any, category: any){
    let tempMenuList: MenuItem[] = [];
    for(let i=0;i<this.menuList.length;i++){
      if(this.menuList[i].menuItemId !== id){
        tempMenuList.push(this.menuList[i]);
      }
    }
    this.menuList = tempMenuList;
    this.menuService.deleteMenuItem(id).subscribe((res) => {
      
    });
  }

  onViewMenuDetails(id: any){
    this.router.navigate([`/menudiscription/${id}`]);
  }

  truncateDescription(desc: any){
    if(desc.length>90){
      return desc.substring(0,90) + '...';
    }
    return desc;
  }
}

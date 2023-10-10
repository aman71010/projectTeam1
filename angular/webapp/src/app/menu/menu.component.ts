import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from '../Models/MenuItem';
import { MenuService } from '../Services/MenuService/menu.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  menuList?: MenuItem[];

  constructor(
    private menuService: MenuService, 
    private router: Router, 
    private sanitizer: DomSanitizer
  ) { }

  getImage(imageData: any){
    const imageUrl = 'data:image/jpeg;base64,' + imageData;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit(): void {
    this.getAllMenuItems();
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

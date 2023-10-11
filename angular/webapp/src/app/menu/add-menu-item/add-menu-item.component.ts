import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MenuService } from 'src/app/services/MenuService/menu.service';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent {

  constructor(private menuService: MenuService) {}

  menuItemForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]), 
    category: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    //image: new FormControl(null)
  });

  get name() { return this.menuItemForm.get('name'); };
  get description() { return this.menuItemForm.get('description'); };
  get category() { return this.menuItemForm.get('category'); };
  get price() { return this.menuItemForm.get('price'); };
  get image() { return this.menuItemForm.get('image'); };

  MenuItemSubmit(){
    if(this.menuItemForm.valid){
      
      let menuItemData = {
        name: this.menuItemForm.value.name,
        description: this.menuItemForm.value.description,
        category: this.menuItemForm.value.category,
        price: this.menuItemForm.value.price,
        //image: this.menuItemForm.value.image
      };

      this.menuService.createMenuItem(menuItemData).subscribe(
        (res: any) => {
          console.log(res);
        }),
        (err: any) => {
          console.log(err);
        }
    }
  }
}

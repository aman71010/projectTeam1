import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { MenuService } from 'src/app/services/MenuService/menu.service';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit{
  
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  selectedFile: any;

  constructor(private menuService: MenuService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
      
  }

  menuItemForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]), 
    category: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
  });

  get name() { return this.menuItemForm.get('name'); };
  get description() { return this.menuItemForm.get('description'); };
  get category() { return this.menuItemForm.get('category'); };
  get price() { return this.menuItemForm.get('price'); };

  MenuItemSubmit(){
    if(this.menuItemForm.valid){
      let menuItemData = {
        Name: this.menuItemForm.value.name,
        Description: this.menuItemForm.value.description,
        Price: this.menuItemForm.value.price,
        Category: this.menuItemForm.value.category,
      };
      this.onUpload(menuItemData);
    }
  }

  onFileUpload(event: any){
    this.selectedFile = event.target.files[0]; 
  }

  onUpload(menuItemData: any){
    const formData: FormData = new FormData();
    formData.append('Name', menuItemData.Name);
    formData.append('Description', menuItemData.Description);
    formData.append('Category', menuItemData.Category);
    formData.append('Price', menuItemData.Price);
    formData.append('Image', this.selectedFile);
    this.menuService.createMenuItem(formData).subscribe(
      (data: any) => {
        this.openSnackBar("Menu added");
      },
      (err) => {
        this.openSnackBar(err.error.message);
      }
    )
  }

  openSnackBar(message: string){
    this.snackBar.open(message, "close", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
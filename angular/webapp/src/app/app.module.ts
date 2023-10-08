import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuDescriptionComponent } from './menu-description/menu-description.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'; // Import MatDividerModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MenuDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatCardModule,MatDividerModule, // Add MatDividerModule to your imports
    MatIconModule,CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

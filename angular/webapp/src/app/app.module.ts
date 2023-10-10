import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import {HttpClientModule} from'@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import{MatListModule} from '@angular/material/list'
import {MatChipsModule} from '@angular/material/chips'
import {MatCardModule} from'@angular/material/card'


=======
import { FormsModule } from '@angular/forms';
>>>>>>> d5666ef4a1e056544d3059cb85afa355add5846a
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MenuDescriptionComponent } from './menu-description/menu-description.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { MenuItemDetailsComponent } from './menu/menu-item-details/menu-item-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuDescriptionComponent,
    CheckoutComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    OrderComponent,
    ForgotPasswordComponent,
    MenuItemDetailsComponent,
    SubscriptionComponent
  ],
  imports: [
<<<<<<< HEAD
    BrowserModule,HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatToolbarModule, MatIconModule, MatListModule, MatChipsModule, MatCardModule
=======
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    MatIconModule,CommonModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> d5666ef4a1e056544d3059cb85afa355add5846a
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

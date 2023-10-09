import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
<<<<<<< HEAD
import{HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
=======
import { MenuItemDetailsComponent } from './menu/menu-item-details/menu-item-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';

>>>>>>> 6f63dbc6ecf613d78fcb9e19d8898e4a7a04f888
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
<<<<<<< HEAD
    ForgotPasswordComponent
=======
    MenuItemDetailsComponent,
    SubscriptionComponent
>>>>>>> 6f63dbc6ecf613d78fcb9e19d8898e4a7a04f888
  ],
  imports: [
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
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

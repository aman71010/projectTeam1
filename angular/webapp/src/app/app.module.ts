import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from'@angular/common/http';



import{MatListModule} from '@angular/material/list'
import {MatChipsModule} from '@angular/material/chips'
import {MatCardModule} from'@angular/material/card'


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';


import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import {NgxPaginationModule} from 'ngx-pagination';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { MenuDescriptionComponent } from './menu-description/menu-description.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';


import { MatSidenavModule } from '@angular/material/sidenav';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { SubscriptionComponent } from './subscription/subscription.component';


import { AddMenuItemComponent } from './menu/add-menu-item/add-menu-item.component';
import { PaymentsComponent } from './payments/payments.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionformComponent } from './subscriptionform/subscriptionform.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomealtComponent } from './homealt/homealt.component';

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
    SubscriptionComponent,
    AddMenuItemComponent,
    PaymentsComponent,
    HeaderComponent,
    HomeComponent,
    SubscriptionformComponent,
    NotFoundComponent,
    HomealtComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    MatToolbarModule,   
    AppRoutingModule,
    MatListModule,
    MatChipsModule, 
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

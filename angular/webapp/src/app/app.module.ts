import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar'
import{MatListModule} from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips'
import {MatCardModule} from'@angular/material/card'
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { MenuItemDetailsComponent } from './menu/menu-item-details/menu-item-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AddMenuItemComponent } from './menu/add-menu-item/add-menu-item.component';
import { PaymentsComponent } from './payments/payments.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

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
    SubscriptionComponent,
    AddMenuItemComponent,
    PaymentsComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule, 
     MatListModule,
     MatChipsModule, MatCardModule,
     ReactiveFormsModule,FormsModule,
    MatCardModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatCardModule,
    BrowserAnimationsModule,MatToolbarModule,
     MatListModule,
     MatChipsModule, MatCardModule,
     ReactiveFormsModule,FormsModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

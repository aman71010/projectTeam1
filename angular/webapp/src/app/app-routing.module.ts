import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuDescriptionComponent } from './menu-description/menu-description.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component'; 
import { SubscriptionComponent } from './subscription/subscription.component';
import { MenuComponent } from './menu/menu.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddMenuItemComponent } from './menu/add-menu-item/add-menu-item.component';
import { HomeComponent } from './home/home.component';

import { PaymentsComponent } from './payments/payments.component';
import { HomealtComponent } from './homealt/homealt.component';


const routes: Routes = [
  {path:"", component: HomealtComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'addmenu', component: AddMenuItemComponent},
  {path :'order',component:OrderComponent},
  {path:'subscribe',component:SubscriptionComponent},
  {path: 'menudiscription',component:MenuDescriptionComponent},
  {path: 'checkout',component: CheckoutComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path: 'menudiscription/:id',component:MenuDescriptionComponent},
  {path: 'checkout/:id',component: CheckoutComponent},
  {path:'homealt',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

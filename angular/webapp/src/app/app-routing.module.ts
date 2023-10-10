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
<<<<<<< HEAD
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
=======
import { AddMenuItemComponent } from './menu/add-menu-item/add-menu-item.component';
>>>>>>> 7a7dfd84233d68870f4b98b2a5c97f70634fd303

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'addmenu', component: AddMenuItemComponent},
  {path :'order',component:OrderComponent},
  {path:'subscribe',component:SubscriptionComponent},
  {path: 'menudiscription',component:MenuDescriptionComponent},
  {path: 'checkout',component: CheckoutComponent},
<<<<<<< HEAD
  {path:'forgotpassword',component:ForgotPasswordComponent}
=======
  {path: 'menudiscription/:id',component:MenuDescriptionComponent},
  {path: 'checkout/:id',component: CheckoutComponent},
>>>>>>> 7a7dfd84233d68870f4b98b2a5c97f70634fd303
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

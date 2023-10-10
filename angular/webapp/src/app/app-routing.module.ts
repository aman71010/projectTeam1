import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuDescriptionComponent } from './menu-description/menu-description.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component'; 


import { OrderComponent } from './order/order.component';

import { MenuItemDetailsComponent } from './menu/menu-item-details/menu-item-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path: 'menu', component: MenuComponent},
  {path :'menu-item-details/:id',component: MenuItemDetailsComponent},
  {path :'order',component:OrderComponent},
  {path:'subscribe',component:SubscriptionComponent},
  {path: 'menudiscription/:id',component:MenuDescriptionComponent},
  {path: 'checkout/:id',component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

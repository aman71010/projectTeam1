import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
import { OrderComponent } from './order/order.component'; 
import { SubscriptionComponent } from './subscription/subscription.component';
=======
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
>>>>>>> 81c3fb1cc5e9896d5d51cbc7b2306a26b4cdd143

const routes: Routes = [
  {path: 'checkout',component: CheckoutComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path: 'menu', component: MenuComponent},
  {path :'order',component:OrderComponent},
  {path:'subscribe',component:SubscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

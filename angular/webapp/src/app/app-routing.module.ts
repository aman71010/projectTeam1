import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:'profile',component:ProfileComponent},
  {path: 'menu', component: MenuComponent},
  {path :'order',component:OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

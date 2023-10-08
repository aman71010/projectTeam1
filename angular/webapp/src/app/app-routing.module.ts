import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDescriptionComponent } from './menu-description/menu-description.component';

const routes: Routes = [
  {path: 'menudiscriprion',component:MenuDescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'', redirectTo: '/home' , pathMatch: 'full'}, 
  {path: 'home', component:HomeComponent},
  {path: 'form', component:FormComponent},
  {path: 'success', component:SuccessComponent},
  {path: 'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

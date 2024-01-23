import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/acceso/login/login.component';
import { RegisterComponent } from './vistas/acceso/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: 'admin', loadChildren: () => import('./vistas/admin/admin.module').then(m => m.AdminModule) },
  { path: 'home', loadChildren: () => import('./vistas/home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

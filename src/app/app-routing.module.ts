import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/acceso/login/login.component';
import { RegisterComponent } from './vistas/acceso/register/register.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "login", component: LoginComponent, canActivate: [loginGuard]},
  { path: "register", component: RegisterComponent, canActivate: [loginGuard]},
  { path: 'admin', loadChildren: () => import('./vistas/admin/admin.module').then(m => m.AdminModule),  canActivate: [authGuard, adminGuard], canMatch: [authGuard, adminGuard]}, // canActivate: [authGuard, adminGuard], canMatch: [authGuard, adminGuard]
  { path: 'home',  loadChildren: () => import('./vistas/home/home.module').then(m => m.HomeModule),  canActivate: [authGuard], canMatch: [authGuard]}, // canActivate: [authGuard], canMatch: [authGuard]
  { path: 'perfil', loadChildren: () => import('./vistas/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [authGuard], canMatch: [authGuard]}, 
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { VistaHomeComponent } from './vista-home/vista-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'home', component: VistaHomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

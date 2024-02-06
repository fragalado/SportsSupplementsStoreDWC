import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { VistaHomeComponent } from './vista-home/vista-home.component';
import { VistaSuplementoComponent } from './vista-suplemento/vista-suplemento.component';
import { VistaSuplementosComponent } from './vista-suplementos/vista-suplementos.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'home', component: VistaHomeComponent},
    { path: 'suplemento/:id', component: VistaSuplementoComponent},
    { path: 'suplementos', component: VistaSuplementosComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

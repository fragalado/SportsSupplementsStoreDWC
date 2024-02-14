import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplementsStoreComponent } from './supplements-store.component';
import { DetalleSuplementoComponent } from './suplementos/detalle-suplemento/detalle-suplemento.component';
import { ListaSuplementosComponent } from './suplementos/lista-suplementos/lista-suplementos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {
    path: '', component: SupplementsStoreComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'suplemento/:id', component: DetalleSuplementoComponent },
      { path: 'suplementos', component: ListaSuplementosComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'carrito', component: CarritoComponent},
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplementsStoreRoutingModule { }

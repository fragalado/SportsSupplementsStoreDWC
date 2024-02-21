import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplementsStoreComponent } from './supplements-store.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ListadoSuplementosComponent } from './suplementos/listado-suplementos/listado-suplementos.component';

const routes: Routes = [
  {
    path: '', component: SupplementsStoreComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'suplementos', component: ListadoSuplementosComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'carrito', component: CarritoComponent},
      { path: 'pedidos', component: PedidosComponent},
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplementsStoreRoutingModule { }

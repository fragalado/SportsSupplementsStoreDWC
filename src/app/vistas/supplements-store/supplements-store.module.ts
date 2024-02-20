import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplementsStoreRoutingModule } from './supplements-store-routing.module';
import { SupplementsStoreComponent } from './supplements-store.component';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { ListaSuplementosComponent } from './suplementos/lista-suplementos/lista-suplementos.component';
import { DetalleSuplementoComponent } from './suplementos/detalle-suplemento/detalle-suplemento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidosComponent } from './pedidos/pedidos.component';


@NgModule({
  declarations: [
    SupplementsStoreComponent,
    NavbarComponent,
    ListaSuplementosComponent,
    DetalleSuplementoComponent,
    PerfilComponent,
    HomeComponent,
    CarritoComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    SupplementsStoreRoutingModule
  ]
})
export class SupplementsStoreModule { }

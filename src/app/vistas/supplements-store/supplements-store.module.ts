import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplementsStoreRoutingModule } from './supplements-store-routing.module';
import { SupplementsStoreComponent } from './supplements-store.component';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MaterialModule } from '../core/material/material.module';
import { ListadoSuplementosComponent } from './suplementos/listado-suplementos/listado-suplementos.component';
import { VistaSuplementoComponent } from './suplementos/vista-suplemento/vista-suplemento.component';


@NgModule({
  declarations: [
    SupplementsStoreComponent,
    NavbarComponent,
    PerfilComponent,
    HomeComponent,
    CarritoComponent,
    PedidosComponent,
    ListadoSuplementosComponent,
    VistaSuplementoComponent
  ],
  imports: [
    CommonModule,
    SupplementsStoreRoutingModule,
    MaterialModule
  ]
})
export class SupplementsStoreModule { }

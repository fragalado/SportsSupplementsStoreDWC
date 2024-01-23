import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario/detalle-usuario.component';
import { ListaSuplementosComponent } from './suplementos/lista-suplementos/lista-suplementos.component';
import { DetalleSuplementoComponent } from './suplementos/detalle-suplemento/detalle-suplemento.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListaUsuariosComponent,
    DetalleUsuarioComponent,
    ListaSuplementosComponent,
    DetalleSuplementoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

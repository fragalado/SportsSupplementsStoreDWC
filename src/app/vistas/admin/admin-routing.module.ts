import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario/detalle-usuario.component';
import { ListaSuplementosComponent } from './suplementos/lista-suplementos/lista-suplementos.component';
import { DetalleSuplementoComponent } from './suplementos/detalle-suplemento/detalle-suplemento.component';

const routes: Routes = [
  { path: '', component: AdminComponent , children: [
    { path: 'usuarios', component: ListaUsuariosComponent},
    { path: 'detalle-usuario/:id', component: DetalleUsuarioComponent},
    { path: 'suplementos', component: ListaSuplementosComponent},
    { path: 'detalle-suplemento/:id', component: DetalleSuplementoComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

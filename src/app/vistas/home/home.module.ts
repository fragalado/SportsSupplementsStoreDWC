import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { VistaHomeComponent } from './vista-home/vista-home.component';
import { VistaSuplementoComponent } from './vista-suplemento/vista-suplemento.component';
import { VistaSuplementosComponent } from './vista-suplementos/vista-suplementos.component';


@NgModule({
  declarations: [
    HomeComponent,
    VistaHomeComponent,
    VistaSuplementoComponent,
    VistaSuplementosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

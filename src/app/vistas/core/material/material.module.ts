import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const modulos = [
  MatTableModule,
  MatIconModule,
  MatButtonModule
]

@NgModule({
  imports: modulos, 
  exports: modulos
})
export class MaterialModule { }

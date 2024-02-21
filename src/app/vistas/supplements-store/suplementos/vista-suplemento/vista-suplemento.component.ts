import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suplemento } from 'src/app/modelos/suplemento';

@Component({
  selector: 'app-vista-suplemento',
  templateUrl: './vista-suplemento.component.html',
  styleUrls: ['./vista-suplemento.component.css']
})
export class VistaSuplementoComponent {

  // Entrada del componente padre
  // Variable donde guardaremos el suplemento a mostrar
  @Input() suplemento?: Suplemento;
  // Evento de salida que emite un suplemento
  @Output() suplementoAgregadoAlCarrito = new EventEmitter<Suplemento>();

  /**
   * Método que emite un suplemento
   */
  agregarAlCarrito(){
    this.suplementoAgregadoAlCarrito.emit(this.suplemento);
  }
}

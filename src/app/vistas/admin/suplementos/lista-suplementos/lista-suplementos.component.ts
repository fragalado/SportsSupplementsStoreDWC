import { Component } from '@angular/core';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-suplementos',
  templateUrl: './lista-suplementos.component.html',
  styleUrls: ['./lista-suplementos.component.css']
})
export class ListaSuplementosComponent {

  // Lista de tipos Suplementos donde guardaremos todos los suplementos de la base de datos
  suplementos: Suplemento[] = [];

  // Constructor
  constructor(private dbs: DatabaseService) {}

  ngOnInit() {
    // Obtenemos todos los suplementos de la base de datos
    this.dbs.getCollection("suplementos").subscribe(res => this.suplementos = res);
  }

  /**
   * Método que elimina un suplemento de la base de datos
   * @param suplemento Objeto suplemento a borrar
   */
  eliminarSuplemento(suplemento: Suplemento) {
    this.dbs.deleteDocument(suplemento.id!, 'suplementos')
      .then(() => Swal.fire({
        title: "Borrado",
        text: "Borrado con éxito!!",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
        icon: "error"
      }));
  }
}

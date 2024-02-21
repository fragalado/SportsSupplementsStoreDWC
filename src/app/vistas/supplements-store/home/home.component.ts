import { Component } from '@angular/core';
import { Carrito } from 'src/app/modelos/carrito';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Lista donde guardaremos todos los suplementos de la base de datos
  suplementos?: Suplemento[];

  // Suplemento seleccionado
  suplemento?: Suplemento;

  // Constructor
  constructor(
    private dbs: DatabaseService
  ) {}

  /**
   * Método que se inicia al iniciar el componente
   */
  ngOnInit(){
    // Obtenemos todos los suplementos
    this.dbs.getCollection('suplementos').subscribe(res => {
      // Le agregamos todos los suplementos a la lista suplementos
      this.suplementos = res;

      // Ahora solo nos vamos a quedar con los 6 primeros
      if(this.suplementos.length > 6)
        this.suplementos = this.suplementos.slice(0, 6);
    })
  }

  /**
   * Método que activa/desactiva la vista suplemento.
   * @param suplemento Suplemento a mostrar en la vista detallada
   */
  activaVistaSuplemento(suplemento: Suplemento){
    if(this.suplemento == suplemento){
      this.suplemento = undefined;
    } else {
      this.suplemento = suplemento;
    }
  }

  /**
   * Método que agrega un suplemento pasado por parámetros al carrito
   * @param suplemento Suplemeto a agregar al carrito
   */
  agregarAlCarrito(suplemento: Suplemento){
    // Obtenemos el id del usuario
    const idUsuario = localStorage.getItem('idUsuario')!;

    // Creamos un objeto Carrito
    const carrito: Carrito = {
      idUsuario: idUsuario,
      idSuplemento: suplemento.id!,
      cantidad: 1,
      estaComprado: false
    }

    // Agregamos el carrito a la base de datos
    this.dbs.newDocument(carrito, 'carritos')
      .then(() => {
        Swal.fire({
          title: "Agregado",
          text: "Agregado con éxito!!",
          icon: "success"
        })
      })
      .catch(() => {
        Swal.fire({
          title: "Oops..",
          text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
          icon: "error"
        })
      });
  }
}

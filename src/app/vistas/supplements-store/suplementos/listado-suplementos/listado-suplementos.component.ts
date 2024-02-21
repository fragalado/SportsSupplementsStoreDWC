import { Component } from '@angular/core';
import { Carrito } from 'src/app/modelos/carrito';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-suplementos',
  templateUrl: './listado-suplementos.component.html',
  styleUrls: ['./listado-suplementos.component.css']
})
export class ListadoSuplementosComponent {
  // Lista donde guardaremos todos los suplementos
  todosSuplementos?: Suplemento[];
  // Lista donde guardaremos los suplementos que se van a mostrar por la vista
  suplementos?: Suplemento[];
  
  // Constructor
  constructor(
    private dbs: DatabaseService,
  ) { }

  /**
   * Método que se inicia al iniciar el componente
   */
  ngOnInit() {
    // Obtenemos todos los suplementos
    this.dbs.getCollection('suplementos').subscribe(res => {
      this.todosSuplementos = res;

      this.suplementos = this.todosSuplementos;
    });
  }

  /**
   * Método para filtrar la lista suplementos por tipo
   * @param tipo Tipo del suplemento (1:Proteína; 2:Creatina; 3:Todo)
   */
  filtraPor(tipo: number) {
    console.log("Ha entrado en filtraPor");
    if (tipo == 1)
      this.suplementos = this.todosSuplementos?.filter(res => res.tipo == 'Proteína');

    if (tipo == 2)
      this.suplementos = this.todosSuplementos?.filter(res => res.tipo == 'Creatina');

    if (tipo == 3)
      this.suplementos = this.todosSuplementos;

  }

  /**
   * Método que agrega al carrito un suplemento
   * @param object Suplemento a agregar al carrito
   */
  agregarAlCarrito(object: any) {

    // Obtenemos el id del usuario
    const idUsuario = localStorage.getItem('idUsuario')!;

    // Creamos un objeto Carrito
    const carrito: Carrito = {
      idUsuario: idUsuario,
      idSuplemento: object.id,
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

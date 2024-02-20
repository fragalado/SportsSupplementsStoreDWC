import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/modelos/carrito';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-suplementos',
  templateUrl: './lista-suplementos.component.html',
  styleUrls: ['./lista-suplementos.component.css']
})
export class ListaSuplementosComponent {

  todosSuplementos?: Suplemento[];
  suplementos?: Suplemento[];
  tipo?: string;
  constructor(
    private dbs: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtenemos todos los suplementos
    this.dbs.getCollection('suplementos').subscribe(res => {
      this.todosSuplementos = res;

      this.suplementos = this.todosSuplementos;
    });
  }

  filtraPor(tipo: number) {
    console.log("Ha entrado en filtraPor");
    if (tipo == 1)
      this.suplementos = this.todosSuplementos?.filter(res => res.tipo == 'Proteína');

    if (tipo == 2)
      this.suplementos = this.todosSuplementos?.filter(res => res.tipo == 'Creatina');

    if (tipo == 3)
      this.suplementos = this.todosSuplementos;

  }

  agregarAlCarrito(object: any) {

    const idUsuario = localStorage.getItem('idUsuario')!;

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

import { Component } from '@angular/core';
import { Carrito, CarritoSuplemento } from 'src/app/modelos/carrito';
import { Pedido } from 'src/app/modelos/pedido';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  // Lista de objetos Carrito donde guardaremos los carritos del usuario
  carritos: Carrito[] = [];
  // Lista de objetos Suplemento donde guardaremos todos los suplemetnos de la base de datos
  suplementos?: Suplemento[];
  // Lista de tipo CarritoSuplemento donde guardaremos el carrito con su respectivo suplemento
  carritoSuplemento: CarritoSuplemento[] = [];

  // Constructor
  constructor(
    private dbs: DatabaseService
  ) {}

  /**
   * Método que se inicia al iniciar el componente
   */
  ngOnInit(){
    // Obtenemos el usuario por el email
    const email = JSON.parse(localStorage.getItem('user')!).email;
    this.dbs.queryCollection('usuarios', 'email', email).subscribe((res) => {
      // Guardamos el usuario
      const usuarios = res[0];

      // Obtenemos todos los carritos del usuario
      this.dbs.queryCollection('carritos', 'idUsuario', usuarios.id).subscribe((res2) => {
          // Guardamos en carritos todos los carritos del usuario que no esten comprados
          this.carritos = res2.filter((x:Carrito) => x.estaComprado == false);
          
          // Ahora obtenemos todos los suplementos
          this.dbs.getCollection('suplementos').subscribe((res3) => {
            // Guardamos los suplementos
            this.suplementos = res3;

            // Limpiamos la lista carritoSuplemento
            this.carritoSuplemento = [];
            
            // Ahora filtramos la lista suplementos para quedarnos solo con los suplementos que está en la lista carritos
            this.suplementos = this.suplementos.filter(suplemento => this.carritos?.some(carrito => carrito.idSuplemento == suplemento.id));

            // Recorremos la lista carritos
            this.carritos.forEach(carrito => {
              // Obtenemos el suplemento del carrito
              const suplemento = this.suplementos?.find(x => x.id == carrito.idSuplemento)!;

              // Construimos un objeto CarritoSuplemento
              const carritoSuplementoObjeto: CarritoSuplemento = {
                carrito: carrito,
                suplemento: suplemento
              }
              // Guardamos el objeto creado en la lista
              this.carritoSuplemento?.push(carritoSuplementoObjeto);
            })
          });
        });
    });
  }

  eliminarCarrito(object: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-2",
        cancelButton: "btn btn-danger me-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbs.deleteDocument(object.id, "carritos")
          .then(() => swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "El suplemento ha sido borrado del carrito!!",
            icon: "success"
          }));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El suplemento no ha sido borrado del carrito!!",
          icon: "error"
        });
      }
    });
  }

  /**
   * 
   */
  comprarCarrito(){
    // Recorremos el carrito con los suplementos
    var precioTotal: number = 0;
    var productos = "";
    for (let index = 0; index < this.carritoSuplemento.length; index++) {
      const suplemento = this.carritoSuplemento[index].suplemento;
      precioTotal += Number(suplemento.precio);
      productos = productos + "" + suplemento.nombre + ", ";

      const carrito = this.carritoSuplemento[index].carrito;
      carrito.estaComprado = true;
      this.dbs.updateDocument(carrito, 'carritos');
    }

    // Creamos el objeto Pedido
    // Obtenemos la fecha actual
    const fechaActual = new Date();
    const pedido: Pedido = {
      fecha: fechaActual.getDate() + "/" + (fechaActual.getMonth()+1) + "/" + fechaActual.getFullYear(),
      idUsuario: localStorage.getItem("idUsuario")!,
      precioTotal: precioTotal,
      productos: productos
    }

    // Hacemos el insert a la base de datos
    this.dbs.newDocument(pedido, 'pedidos')
      .then(() => Swal.fire({
        title: "Comprado",
        text: "Comprado con éxito!!",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
        icon: "error"
      }));
  }
}

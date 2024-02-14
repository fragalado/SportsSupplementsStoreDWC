import { Component } from '@angular/core';
import { Carrito, CarritoSuplemento } from 'src/app/modelos/carrito';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  carritos: Carrito[] = [];
  suplementos?: Suplemento[];
  carritoSuplemento: CarritoSuplemento[] = [];
  constructor(
    private dbs: DatabaseService
  ) {}

  ngOnInit(){
    // Obtenemos el usuario por el email
    const email = JSON.parse(localStorage.getItem('user')!).email;
    this.dbs.queryCollection('usuarios', 'email', email).subscribe((res) => {
      const usuarios = res[0];

      // Obtenemos todos los carritos del usuario
      this.dbs.queryCollection('carritos', 'idUsuario', usuarios.id).subscribe((res2) => {
          // Guardamos en carritos todos los carritos del usuario que no esten comprados
          this.carritos = res2.filter((x:Carrito) => x.estaComprado == false);
          
          // Ahora obtenemos todos los suplementos
          this.dbs.getCollection('suplementos').subscribe((res3) => {
            this.suplementos = res3;

            // Limpiamos la lista carritoSuplemento
            this.carritoSuplemento = [];
            
            // Ahora filtramos la lista suplementos para quedarnos solo con los suplementos que está en la lista carritos
            this.suplementos = this.suplementos.filter(suplemento => this.carritos?.some(carrito => carrito.idSuplemento == suplemento.id));

            // Recorremos la lista carritos
            this.carritos.forEach(carrito => {
              const suplemento = this.suplementos?.find(x => x.id == carrito.idSuplemento)!;
              const carritoSuplementoObjeto: CarritoSuplemento = {
                carrito: carrito,
                suplemento: suplemento
              }
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
}
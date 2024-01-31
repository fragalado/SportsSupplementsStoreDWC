import { Component } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {

  usuarios?: Usuario[];
  constructor(private dbs: DatabaseService) {
    
  }

  ngOnInit() {
    // Obtenemos todos los usuarios de la base de datos
    this.dbs.getCollection("usuarios").subscribe(res => {
      this.usuarios = res;

      // Ordenamos la lista usuarios por el id_acceso
      this.usuarios.sort((a, b) => b.id_acceso - a.id_acceso); // De esta forma ordenamos de manera descendente
    });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.id_acceso == 2) {
      Swal.fire({
        title: "Error",
        text: "No se puede borrar un Administrador!!",
        icon: "error"
      });
    } else {
      this.dbs.deleteDocument(usuario.id!, 'usuarios')
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
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {

  // Variable id donde guardaremos el id del usuario
  id?: string;

  // Objeto usuario inicializado
  usuario: Usuario = {email: '', id_acceso: 1, nombre: '', password: '', telefono: ''};

  // Formulario para editar usuario
  formEditarUsuario = this.formBuilder.group({
    email: [this.usuario.email, [Validators.required, Validators.email]],
    nombre: [this.usuario.nombre, Validators.required],
    telefono: [this.usuario.telefono, Validators.required],
    password: [this.usuario.password, Validators.required],
    acceso: [this.usuario.id_acceso, Validators.required]
  });

  // Constructor
  constructor(
    private route: ActivatedRoute, // Servicio de angular que contiene información sobre la ruta actual
    private dbs: DatabaseService, // Servicio que contiene los métodos para interactuar con la base de datos
    private formBuilder: FormBuilder, // Servicio de angular para hacer formularios reactivos
    private router: Router // Servicio que proporciona métodos para navegar entre vistas
    ) {
    
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    // Comprobamos si hay id en la url
    if (this.route.snapshot.paramMap.get('id') != null) {
      // Guardamos el id en la variable id
      this.id = this.route.snapshot.paramMap.get('id')!;

      // Obtenemos el usuario por el id
      this.dbs.getDocumentById(this.id, 'usuarios').subscribe(res => {
        // Guardamos el usuario en el objeto usuario
        this.usuario = res;

        // Actualizamos los datos del formulario
        this.formEditarUsuario.patchValue({
          nombre: this.usuario.nombre,
          telefono: this.usuario.telefono,
          email: this.usuario.email,
          password: this.usuario.password,
          acceso: this.usuario.id_acceso
        })
      });
    }
  }

  /**
   * Método que se ejecuta al enviar el formulario y edita un usuario de la base de datos
   */
  editaUsuario() {
    // Actualizamos los datos del usuario con el formulari
    this.usuario.email = this.formEditarUsuario.controls['email'].value!;
    this.usuario.nombre = this.formEditarUsuario.controls['nombre'].value!;
    this.usuario.telefono = this.formEditarUsuario.controls['telefono'].value!;
    this.usuario.password = this.formEditarUsuario.controls['password'].value!;
    this.usuario.id_acceso = this.formEditarUsuario.controls['acceso'].value!;

    // Actualizamos el usuario en la base de datos
    this.dbs.updateDocument(this.usuario, 'usuarios')
      .then(() => Swal.fire({
        title: "Editado",
        text: "Editado con éxito!!",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
        icon: "error"
      }));

    // Redirigimos a la vista de usuarios
    this.router.navigateByUrl("/admin/usuarios");
  }
}

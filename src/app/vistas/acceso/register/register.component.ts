import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usuario: Usuario = {email: '', id_acceso: 1, nombre: '', password: '', telefono: ''};
  formRegistro = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private dbs: DatabaseService, private router: Router){}

  registrarUsuario() {
    // Actualizamos el usuario con los datos del formulario
    this.usuario.nombre = this.formRegistro.controls['nombre'].value!;
    this.usuario.email = this.formRegistro.controls['email'].value!;
    this.usuario.telefono = this.formRegistro.controls['telefono'].value!;
    this.usuario.password = this.formRegistro.controls['password'].value!;

    // Comprobamos que el email introducido no exista ya un usuario con el email
    var ok = true;
    this.dbs.queryCollection('usuarios', 'email', this.usuario.email).subscribe(res => {
      if (res.length > 1) {
        console.log(res);
        console.log("Hay usuario ya creado");
        ok = false;
      }
    })

    if(ok){
      // Hacemos un insert del usuario a la base de datos
    this.dbs.newDocument(this.usuario, 'usuarios')
    .then(() => Swal.fire({
      title: "Creado",
      text: "Creado con éxito!!",
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

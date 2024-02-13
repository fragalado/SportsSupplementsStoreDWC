import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usuario: Usuario = { email: '', id_acceso: 1, nombre: '', password: '', telefono: '' };
  formRegistro = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private dbs: DatabaseService,
    private authService: AuthService
  ) { }

  registrarUsuario() {
    // Actualizamos el usuario con los datos del formulario
    this.usuario.nombre = this.formRegistro.controls['nombre'].value!;
    this.usuario.email = this.formRegistro.controls['email'].value!;
    this.usuario.telefono = this.formRegistro.controls['telefono'].value!;
    this.usuario.password = this.formRegistro.controls['password'].value!;

    // Hacemos el registro
    this.authService.signUpWithEmailAndPassword(this.usuario);
  }
}

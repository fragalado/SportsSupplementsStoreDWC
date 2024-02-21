import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Objeto Usuario con valores iniciales
  usuario: Usuario = { email: '', id_acceso: 1, nombre: '', password: '', telefono: '' };

  // FormBuilder para el formulario de registro de sesion
  formRegistro = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  /**
   * Método que se llama al intentar registrar un nuevo usuario
   */
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

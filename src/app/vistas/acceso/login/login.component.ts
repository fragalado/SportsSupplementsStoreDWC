import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Usuario con valores iniciales
  usuario: Usuario = { email: '', id_acceso: 1, nombre: '', password: '', telefono: '' };

  // Formulario de inicio de sesión
  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  // Constructor
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {

  }

  /**
   * Método que se llama al hacer el inicio de sesión
   */
  iniciarSesion() {
    // Actualizamos el usuario con los datos del formulario
    this.usuario.email = this.formLogin.controls['email'].value!;
    this.usuario.password = this.formLogin.controls['password'].value!;

    // Llamamos al servicio de autentificación para iniciar sesión
    this.authService.logInWithEmailAndPassword(this.usuario.email, this.usuario.password);
  }
}

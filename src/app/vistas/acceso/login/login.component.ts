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

  // Constructor
  constructor(private authService: AuthService,) {

  }

  /**
   * Método que se llama al hacer el inicio de sesión
   */
  iniciarSesion() {
    // Llamamos al servicio de autentificación para iniciar sesión
    this.authService.logInWithEmailAndPassword(this.usuario.email, this.usuario.password);
  }
}

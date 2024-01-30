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

  usuario: Usuario = {email: '', id_acceso: 1, nombre: '', password: '', telefono: ''};
  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    
  }

  iniciarSesion() {
    // Actualizamos el usuario con los datos del formulario
    this.usuario.email = this.formLogin.controls['email'].value!;
    this.usuario.password = this.formLogin.controls['password'].value!;

    this.authService.logInWithEmailAndPassword(this.usuario.email, this.usuario.password);
  }
}

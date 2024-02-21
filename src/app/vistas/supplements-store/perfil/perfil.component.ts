import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  // Constructor
  constructor(private authService: AuthService) {}

  /**
   * Método que realiza el cierre de sesión
   */
  cerrarSesion(){
    this.authService.logOut();
  }
}

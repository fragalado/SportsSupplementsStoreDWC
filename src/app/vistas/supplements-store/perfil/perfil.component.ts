import { Component } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  // Usuario
  usuario?: Usuario;

  // Constructor
  constructor(
    private authService: AuthService,
    private dbs: DatabaseService) {}

  /**
   * Método que se inicia al iniciar el componente
   */
  ngOnInit(){
    // Obtenemos el usuario por el id
    const idUsuario = localStorage.getItem('idUsuario');

    this.dbs.getDocumentById(idUsuario!, 'usuarios').subscribe(res => this.usuario = res);
  }
  /**
   * Método que realiza el cierre de sesión
   */
  cerrarSesion(){
    this.authService.logOut();
  }
}

import { Component } from '@angular/core';
import { Carrito } from 'src/app/modelos/carrito';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  esAdmin: boolean = false;
  carritosUsuario: Carrito[] = [];
  constructor(
    private authService: AuthService,
    private dbs: DatabaseService
  ) {}

  ngOnInit(){
    // Comprobamos si el usuario es administrador o no
    this.esAdmin = this.authService.isAdmin;

    // Ahora obtenemos los carritos del usuario
    const idUsuario = localStorage.getItem("idUsuario")!;
    this.dbs.queryCollection('carritos', 'idUsuario', idUsuario).subscribe(res => {
      this.carritosUsuario = res.filter((x:Carrito) => x.estaComprado == false);
      console.log(this.carritosUsuario);
    })
  }
}

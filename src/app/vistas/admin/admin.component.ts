import { Component } from '@angular/core';
import { Carrito } from 'src/app/modelos/carrito';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  // Lista de objetos Carrito donde guarderemos los carritos del usuario
  carritosUsuario: Carrito[] = [];

  // Constructor que inyecta el servicio para la base de datos
  constructor(
    private dbs: DatabaseService
  ) { }

  /**
   * Método que se ejecuta al iniciar el componente
   */
  ngOnInit() {    
    // Ahora obtenemos los carritos del usuario
    const idUsuario = localStorage.getItem("idUsuario")!;
    this.dbs.queryCollection('carritos', 'idUsuario', idUsuario).subscribe(res => {
      this.carritosUsuario = res.filter((x:Carrito) => x.estaComprado == false);
    })
  }
}

import { Component } from '@angular/core';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  suplementos?: Suplemento[];

  constructor(
    private dbs: DatabaseService
  ) {}

  ngOnInit(){
    // Obtenemos todos los suplementos
    this.dbs.getCollection('suplementos').subscribe(res => {
      // Le agregamos todos los suplementos a la lista suplementos
      this.suplementos = res;

      // Ahora solo nos vamos a quedar con los 6 primeros
      if(this.suplementos.length > 6)
        this.suplementos = this.suplementos.slice(0, 6);
    })
  }
}

import { Component } from '@angular/core';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-vista-home',
  templateUrl: './vista-home.component.html',
  styleUrls: ['./vista-home.component.css']
})
export class VistaHomeComponent {
  
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

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-vista-suplementos',
  templateUrl: './vista-suplementos.component.html',
  styleUrls: ['./vista-suplementos.component.css']
})
export class VistaSuplementosComponent {

  todosSuplementos?: Suplemento[];
  suplementos?: Suplemento[];
  tipo?: string;
  constructor(
    private dbs: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtenemos todos los suplementos
    this.dbs.getCollection('suplementos').subscribe(res => {
      this.todosSuplementos = res;

      this.suplementos = this.todosSuplementos;
    });
  }

  filtraPor(tipo: number) {
    console.log("Ha entrado en filtraPor");
    if (tipo == 1)
      this.suplementos = this.todosSuplementos?.filter(res => res.tipo == 'Proteína');

    if (tipo == 2)
      this.suplementos = this.todosSuplementos?.filter(res => res.tipo == 'Creatina');

    if (tipo == 3)
      this.suplementos = this.todosSuplementos;

  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-detalle-suplemento',
  templateUrl: './detalle-suplemento.component.html',
  styleUrls: ['./detalle-suplemento.component.css']
})
export class DetalleSuplementoComponent {

  suplemento?: Suplemento;
  constructor(
    private dbs: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    // Comprobamos si hay id en la url
    if(this.route.snapshot.paramMap.get('id') != null){
      // Obtenemos el suplemento por el id
      this.dbs.getDocumentById(this.route.snapshot.paramMap.get('id')!, 'suplementos').subscribe(res => this.suplemento = res);
    } else {
      // Si no existe id en la url devolveremos a la vista home
      this.router.navigateByUrl('/home/home');
    }
  }
}

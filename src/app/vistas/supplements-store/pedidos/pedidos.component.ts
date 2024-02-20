import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Pedido } from 'src/app/modelos/pedido';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  dataSource = prueba;
  columnsToDisplay = ['fecha', 'productos', 'precioTotal'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pedido | null = null;

  constructor(
    private dbs: DatabaseService
  ) {}

  ngOnInit(){
    // Obtenemos los pedidos del usuario
  }
}

const prueba: Pedido[] = [
  {
    fecha: "20/02/2024",
    idUsuario: "1",
    precioTotal: 10,
    productos: "EvoWhey Protein, Creatina",
    id: "1"
  },
  {
    fecha: "22/02/2024",
    idUsuario: "1",
    precioTotal: 12,
    productos: "EvoWhey Protein, Creatina",
    id: "1"
  }
]

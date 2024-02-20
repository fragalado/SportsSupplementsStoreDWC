import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Pedido } from 'src/app/modelos/pedido';
import { DatabaseService } from 'src/app/servicios/database.service';
import jsPDF from 'jspdf';

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
  pedidos: Pedido[] = [];
  dataSource = this.pedidos;
  // Utilizamos un mapeo para personalizar los nombres de las columnas
  columnDisplayMapping: { [key: string]: keyof Pedido } = {
    'Fecha': 'fecha',
    'Productos': 'productos',
    'Precio Total': 'precioTotal'
  };
  columnsToDisplay = Object.keys(this.columnDisplayMapping);
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pedido | null = null;

  constructor(
    private dbs: DatabaseService
  ) {}

  ngOnInit(){
    // Obtenemos los pedidos del usuario
    this.dbs.queryCollection('pedidos', 'idUsuario', localStorage.getItem("idUsuario")!).subscribe(res => this.dataSource = res);
  }

  openPDF(pedido: Pedido) {
    const doc = new jsPDF();

    doc.text("Fecha: " +pedido.fecha, 10, 10);
    doc.text("Productos: " + pedido.productos, 10, 20);
    doc.text("Precio total: " + pedido.precioTotal + "€", 10, 30);

    // Obtener los datos del documento como un objeto Blob
    const blobData = doc.output('blob');

    // Crear una URL de objeto (blob URL)
    const blobURL = URL.createObjectURL(blobData);

    // Abrir el PDF en una nueva pestaña
    window.open(blobURL, '_blank');
  }
}

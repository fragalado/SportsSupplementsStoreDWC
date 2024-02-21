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

  // Lista donde guardaremos todos los pedidos
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

  // Constructor
  constructor(
    private dbs: DatabaseService
  ) {}

  /**
   * Método que se inicia al iniciar el componente
   */
  ngOnInit(){
    // Obtenemos los pedidos del usuario
    this.dbs.queryCollection('pedidos', 'idUsuario', localStorage.getItem("idUsuario")!).subscribe(res => this.dataSource = res);
  }

  /**
   * Método que crea un PDF y lo abre en una pestaña nueva
   * @param pedido Pedido que se mostrará en el PDF
   */
  openPDF(pedido: Pedido) {
    const doc = new jsPDF();

    doc.text("Fecha: " +pedido.fecha, 10, 10);

    doc.text("Productos:", 10, 20);
    let i = 30;
    pedido.productos.split(',').forEach(producto => {
      doc.text(producto.trim(), 10, i);
      i += 10;
    });

    doc.text("Precio total: " + pedido.precioTotal + "€", 10, i);

    // Obtener los datos del documento como un objeto Blob
    const blobData = doc.output('blob');

    // Crear una URL de objeto (blob URL)
    const blobURL = URL.createObjectURL(blobData);

    // Abrir el PDF en una nueva pestaña
    window.open(blobURL, '_blank');
  }
}

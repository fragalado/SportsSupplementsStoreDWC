import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-suplemento',
  templateUrl: './detalle-suplemento.component.html',
  styleUrls: ['./detalle-suplemento.component.css']
})
export class DetalleSuplementoComponent {

  id?: string;
  suplemento: Suplemento = {descripcion:'', marca: '', nombre: '', precio: 0, tipo: ''};
  formEditarSuplemento = this.formBuilder.group({
    descripcion: [this.suplemento.descripcion, Validators.required],
    nombre: [this.suplemento.nombre, Validators.required],
    marca: [this.suplemento.marca, Validators.required],
    precio: [this.suplemento.precio, Validators.required],
    tipo: [this.suplemento.tipo, Validators.required]
  });
  constructor(
    private route: ActivatedRoute,
    private dbs: DatabaseService,
    private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.dbs.getDocumentById(this.id, 'suplementos').subscribe(res => {
        this.suplemento = res;

        // Actualizamos los datos del formulario
        this.formEditarSuplemento.patchValue({
          nombre: this.suplemento.nombre,
          descripcion: this.suplemento.descripcion,
          marca: this.suplemento.marca,
          precio: this.suplemento.precio,
          tipo: this.suplemento.tipo
        })
      });
    }
  }

  editaSuplemento() {
    // Actualizamos los datos del suplemento con el formulario
    this.suplemento.descripcion = this.formEditarSuplemento.controls['descripcion'].value!;
    this.suplemento.nombre = this.formEditarSuplemento.controls['nombre'].value!;
    this.suplemento.marca = this.formEditarSuplemento.controls['marca'].value!;
    this.suplemento.tipo = this.formEditarSuplemento.controls['tipo'].value!;
    this.suplemento.precio = this.formEditarSuplemento.controls['precio'].value!;

    // Actualizamos el suplemento en la base de datos
    this.dbs.updateDocument(this.suplemento, 'suplementos')
      .then(() => Swal.fire({
        title: "Editado",
        text: "Editado con éxito!!",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
        icon: "error"
      }));
  }
}

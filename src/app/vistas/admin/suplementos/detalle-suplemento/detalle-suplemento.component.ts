import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suplemento } from 'src/app/modelos/suplemento';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-suplemento',
  templateUrl: './detalle-suplemento.component.html',
  styleUrls: ['./detalle-suplemento.component.css']
})
export class DetalleSuplementoComponent {

  // Variable donde guardaremos el titulo de la vista
  titulo = "Editar suplemento"

  // Variable donde guardaremos el id del suplemento
  id?: string;  

  // Objeto suplemento inicializado
  suplemento: Suplemento = {descripcion:'', marca: '', nombre: '', precio: 0, tipo: '', url: ''};

  // Formulario
  formEditarSuplemento = this.formBuilder.group({
    descripcion: [this.suplemento.descripcion, Validators.required],
    nombre: [this.suplemento.nombre, Validators.required],
    marca: [this.suplemento.marca, Validators.required],
    precio: [this.suplemento.precio, Validators.required],
    tipo: [this.suplemento.tipo, Validators.required],
    url: [this.suplemento.url, Validators.required]
  });

  // Constructor
  constructor(
    private route: ActivatedRoute,
    private dbs: DatabaseService,
    private formBuilder: FormBuilder,
    private router: Router) {
    
  }

  /**
   * Método que se ejecuta al iniciar el componente
   */
  ngOnInit() {
    // Comprobamos si hay un id en la url
    if (this.route.snapshot.paramMap.get('id') != null) {
      // Si hay lo guardamos en id
      this.id = this.route.snapshot.paramMap.get('id')!;

      // Obtenemos el suplemento por el id
      this.dbs.getDocumentById(this.id, 'suplementos').subscribe(res => {
        // Guardamos el valor en la variable suplemento
        this.suplemento = res;

        // Actualizamos los datos del formulario
        this.formEditarSuplemento.patchValue({
          nombre: this.suplemento.nombre,
          descripcion: this.suplemento.descripcion,
          marca: this.suplemento.marca,
          precio: this.suplemento.precio,
          tipo: this.suplemento.tipo,
          url: this.suplemento.url
        })
      });
    } else {
      // Si no hay id en la url quiere decir que es para agregar un nuevo suplemento
      // Luego cambiamos el titulo de la vista
      this.titulo = "Agregar suplemento"
    }
  }

  /**
   * Método que se ejecuta al enviar el formulario
   */
  enviaDatos() {
    // Actualizamos los datos del suplemento con el formulario
    this.suplemento.descripcion = this.formEditarSuplemento.controls['descripcion'].value!;
    this.suplemento.nombre = this.formEditarSuplemento.controls['nombre'].value!;
    this.suplemento.marca = this.formEditarSuplemento.controls['marca'].value!;
    this.suplemento.tipo = this.formEditarSuplemento.controls['tipo'].value!;
    this.suplemento.precio = this.formEditarSuplemento.controls['precio'].value!;
    this.suplemento.url = this.formEditarSuplemento.controls['url'].value!;

    // Si tenemos id llamamos al método editaSuplemento
    // Si no hay id llamamos al método agregaSuplemento
    if(this.id)
      this.editaSuplemento();
    else
      this.agregaSuplemento();

    // Redirigimos a /admin/suplementos
    this.router.navigateByUrl("/admin/suplementos");
  }

  /**
   * Método que edita/actualiza un suplemento en la base de datos
   */
  editaSuplemento() {
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

  /**
   * Método que agrega un nuevo suplemento a la base de datos
   */
  agregaSuplemento(){
    // Agregamos el suplemento a la base de datos
    this.dbs.newDocument(this.suplemento, 'suplementos')
    .then(() => Swal.fire({
      title: "Agregado",
      text: "Agregado con éxito!!",
      icon: "success"
    }))
    .catch(() => Swal.fire({
      title: "Oops..",
      text: "Se ha producido un error. Vuelva a intentarlo más tarde.",
      icon: "error"
    }));
  }
}

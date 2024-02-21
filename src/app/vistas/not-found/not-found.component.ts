import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  // Constructor
  constructor(
    private router: Router
  ) {}

  /**
   * Método para volver al home
   */
  volverPagina(){
    this.router.navigateByUrl('/SupplementsStore/home');
  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  esAdmin: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Comprobamos si el usuario es administrador o no
    this.esAdmin = this.authService.isAdmin;
    console.log(this.esAdmin);
  }
}

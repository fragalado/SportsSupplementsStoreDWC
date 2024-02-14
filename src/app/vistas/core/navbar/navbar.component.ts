import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  esAdmin: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(){
    // Comprobamos si el usuario es administrador o no
    this.esAdmin = this.authService.isAdmin;
    console.log(this.esAdmin);
  }
}

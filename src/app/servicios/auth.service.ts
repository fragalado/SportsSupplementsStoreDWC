import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Método que devuelve true si el usuario ha iniciado sesión o false si no ha iniciado sesión.
   * @returns True si ha iniciaco sesión o false si no.
   */
  getAuthToken(): Observable<boolean> {
    if(localStorage.getItem('tokenUsuario')){
      console.log("Hay token de usuario");
      return of(true);
    } else{
      console.log("No hay token de usuario");
      return of(false);
    }
  }

  /**
   * Método que devuelve true si el usuario es admin o false si no es admin.
   * @returns Devuelve true si el usuario es admin o false si no es admin.
   */
  getAdminToken(): Observable<boolean>{
    if(localStorage.getItem('tokenUsuario')){
      return of(true);
    } else{
      return of(false);
    }
  }
}

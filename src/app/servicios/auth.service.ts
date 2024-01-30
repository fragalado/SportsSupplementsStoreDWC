import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    private firebaseAuthenticationService: AngularFireAuth, 
    private router: Router, 
    private ngZone: NgZone
  ) {
    // Guardamos el usuario en el localStorage al hacer log-in y lo ponemos a null cuando hacemos log-out
    firebaseAuthenticationService.authState.subscribe((user) => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }

  /**
   * Método que hace el inicio de sesión de un usuario
   * @param email Email introducido por el usuario
   * @param password Contraseña introducida por el usuario
   */
  logInWithEmailAndPassword(email: string, password: string){
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                  this.userData = userCredential.user;
                  this.observeUserState();
                })
                .catch((error) => alert(error.message));
  }

  /**
   * Método que hace el registro de sesión de un usuario
   * @param email Email introducido por el usuario
   * @param password Contraseña introducida por el usuario
   * @returns Devuelve una promesa
   */
  signUpWithEmailAndPassword(email: string, password: string){
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                  this.userData = userCredential.user;
                  this.observeUserState();
                })
                .catch((error) => alert(error.message));
  }

  /**
   * Método que revisa el estado de la autentificación y si está correcto te redirige al home
   */
  observeUserState(){
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigateByUrl('/home/home'))
    })
  }

  /**
   * Método que devuelve true si el usuario ha iniciado sesión o false si no ha iniciado sesión.
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  /**
   * Método que hace el logout
   * @returns Devuelve una Promesa
   */
  logOut(){
    return this.firebaseAuthenticationService.signOut()
                .then(() => {
                  localStorage.removeItem('user');
                  this.router.navigateByUrl('/login');
                });
  }

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

import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { Usuario } from '../modelos/usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  listaUsuarios?: Usuario[];
  constructor(
    private firebaseAuthenticationService: AngularFireAuth, 
    private router: Router, 
    private ngZone: NgZone,
    private dbs: DatabaseService
  ) {
    // Obtenemos una lista con todos los usuarios de la base de datos
    dbs.getCollection('usuarios').subscribe(res => this.listaUsuarios = res);

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
                  // Buscamos el usuario en la lista de usuarios
                  const usuario = this.listaUsuarios?.find(usuario => usuario.email == email);
                  if(usuario?.id_acceso == 2){
                    // Creamos un nuevo valor en localStorage
                    localStorage.setItem('userID', '2');
                  }

                  localStorage.setItem('idUsuario', usuario?.id!);

                  this.userData = userCredential.user;
                  this.observeUserState();
                })
                .catch(() => {
                  Swal.fire({
                    title: "Oops..",
                    text: "El email y/o contraseña no son correctos!!",
                    icon: "error"
                  });
                });
  }

  /**
   * Método que hace el registro de sesión de un usuario
   * @param email Email introducido por el usuario
   * @param password Contraseña introducida por el usuario
   * @returns Devuelve una promesa
   */
  signUpWithEmailAndPassword(objeto: Usuario){
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(objeto.email, objeto.password)
                .then((userCredential) => {
                  // Guardamos el usuario en la base de datos
                  this.dbs.newDocument(objeto, 'usuarios');
                  
                  // Guardamos el usuario en userData
                  this.userData = userCredential.user;
                  this.observeUserState();
                })
                .catch(() => {
                  Swal.fire({
                    title: "Oops..",
                    text: "El Email introducido ya existe!!",
                    icon: "error"
                  });
                });
  }

  /**
   * Método que revisa el estado de la autentificación y si está correcto te redirige al home
   */
  observeUserState(){
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigateByUrl('/SupplementsStore/home'))
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
   * Método que devuelve true si el usuario es admin o false si no
   */
  get isAdmin(): boolean {
    const id_acceso = localStorage.getItem('userID');
    if(id_acceso == null)
      return false;
    else
      return true;
  }

  /**
   * Método que hace el logout
   * @returns Devuelve una Promesa
   */
  logOut(){
    return this.firebaseAuthenticationService.signOut()
                .then(() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('userID');
                  localStorage.removeItem('idUsuario');
                  this.router.navigateByUrl('/login');
                });
  }
}

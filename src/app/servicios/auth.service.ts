import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { Usuario } from '../modelos/usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para manejar la autentificación del usuario
 */
export class AuthService {

  // Variable donde almacenaremos la información del usuario autentificado
  userData: any;

  // Lista de todos los usuarios de la base de datos
  listaUsuarios?: Usuario[];

  // Constructor que inyecta los servicios necesarios para la autentificación
  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private dbs: DatabaseService
  ) {
    // Obtenemos una lista con todos los usuarios de la base de datos
    dbs.getCollection('usuarios').subscribe(res => this.listaUsuarios = res);
  }

  /**
   * Método que realiza el inicio de sesión de un usuario
   * @param email Email introducido por el usuario
   * @param password Contraseña introducida por el usuario
   */
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Buscamos el usuario en la lista de usuarios
        const usuario = this.listaUsuarios?.find(usuario => usuario.email == email);
        if (usuario?.id_acceso == 2) {
          // Creamos un nuevo valor en localStorage para indicar que el usuario es Admin
          localStorage.setItem('userID', '2');
        }

        // Guardamos el id del usuario en el localStorage
        localStorage.setItem('idUsuario', usuario?.id!);

        // Almacenamos la información del usuario autentificado
        this.userData = userCredential.user;
        localStorage.setItem('user', JSON.stringify(this.userData));
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
   * Método que realiza el registro de sesión de un usuario
   * @param objeto Objeto Usuario con la información del nuevo usuario
   * @returns Devuelve una promesa
   */
  signUpWithEmailAndPassword(objeto: Usuario) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(objeto.email, objeto.password)
      .then(() => {
        localStorage.removeItem('user');
        // Guardamos el usuario en la base de datos
        this.dbs.newDocument(objeto, 'usuarios');

        // Enviamos a la vista login
        this.router.navigateByUrl('/login');

        // Mensaje de registro exitoso
        Swal.fire({
          title: "Registrado",
          text: "Se ha registrado con éxito!!",
          icon: "success"
        });
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
  observeUserState() {
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
    return id_acceso !== null; // Devuelve true si existe un valor en userID
  }

  /**
   * Método que hace el logout
   * @returns Devuelve una Promesa
   */
  logOut() {
    return this.firebaseAuthenticationService.signOut()
      .then(() => {
        // Limpiamos el localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('userID');
        localStorage.removeItem('idUsuario');
        // Redirigimos a la pagina de login
        this.router.navigateByUrl('/login');
      });
  }
}

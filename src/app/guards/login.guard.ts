import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  var ok: boolean = true;
  // GetAuthToken devuelve true si el usuario ha iniciaco sesión o false si no ha iniciado sesión.
  authService.getAuthToken().subscribe(res => ok = res);

  if(ok){
    // Si ok es true es porque el usuario ya ha iniciado sesión,
    // luego devolvemos false para no mostrar la vista del login/register
    return false;
  } else {
    // Si ok es false es porque el usuario no ha iniciado sesión,
    // luego devolvemos true para mostrar la vista del login o register
    return true;
  }
};

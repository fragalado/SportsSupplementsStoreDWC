import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  // Inyectamos el servicio para usar sus métodos de autentificacion
  const authService = inject(AuthService);

  // Inyectamos Router para poder navegar por las URL
  const router = inject(Router);

  // Si el usuario esta registrado devuelve true y si no esta registrado se redirige a /home
  const ok = authService.isLoggedIn;

  if(ok){
    // Esta registrado luego redirigimos a home
    router.navigateByUrl('/home');
  } else{
    return true; // Devolvemos true si el usuario no ha iniciado sesión
  }

  return false; // Devolvemos false si el usuario ha iniciado sesión
};

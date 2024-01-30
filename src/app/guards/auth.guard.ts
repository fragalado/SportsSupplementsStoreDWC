import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos el servicio para usar sus métodos de autentificacion
  const authService = inject(AuthService);

  // Inyectamos Router para poder navegar por las URL
  const router = inject(Router);

  // Si el usuario esta registrado devuelve true y si no esta registrado se redirige a /login
  authService.isLoggedIn || router.navigateByUrl('/login');

  return true;
};

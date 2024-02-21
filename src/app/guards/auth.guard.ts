import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

/**
 * Guard para la autentificación
 */
export const authGuard: CanActivateFn = () => {
  // Inyectamos el servicio para usar sus métodos de autentificacion
  const authService = inject(AuthService);

  // Inyectamos Router para poder navegar por las URL
  const router = inject(Router);

  // Si el usuario esta autentificado devuelve true y si no esta registrado se redirige a /login
  authService.isLoggedIn || router.navigateByUrl('/login');

  // Permitimos el acceso si el usuario está autentificado
  return true;
};

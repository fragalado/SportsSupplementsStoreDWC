import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { inject } from '@angular/core';

/**
 * Guard para administracion
 */
export const adminGuard: CanActivateFn = () => {
  // Inyectamos el servicio para la autentificación
  const authService = inject(AuthService);

  // Inyectamos también el Router para poder navegar por las rutas
  const router = inject(Router);

  // Si devuelve false redirigiremos a home
  authService.isAdmin || router.navigateByUrl('/SupplementsStore/home');

  // Permitimos el acceso si el usuario es un administrador
  return true;
};

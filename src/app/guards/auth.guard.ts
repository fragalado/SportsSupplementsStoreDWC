import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  var ok: boolean = true;
  authService.getAuthToken().subscribe(res => ok = res);
  console.log(ok);
  if(ok){
    console.log("Es true");
    return true;
  } else {
    console.log("Es false");
    return false;
  }
};

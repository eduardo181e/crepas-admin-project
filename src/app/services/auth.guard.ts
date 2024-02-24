import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth-service.service'; // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | any {
    if (this.authService.isAuthenticated()) {
      return true; // Permite el acceso a la ruta si el usuario está autenticado
    } else {
      this.router.navigate(['admin']); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }
}

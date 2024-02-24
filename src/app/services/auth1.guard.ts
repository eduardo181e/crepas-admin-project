// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IdService } from './id.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard1  {

  constructor(private idService: IdService, private router: Router) {}

  canActivate(): boolean {
    if (this.idService.getId()) {
      // Si hay un ID almacenado, permite el acceso a la ruta
      return true;
    } else {
      // Si no hay un ID almacenado, redirige a la página de inicio de sesión (o a la ruta que desees)
      this.router.navigate(['sucursales']);
      return false;
    }
  }
}

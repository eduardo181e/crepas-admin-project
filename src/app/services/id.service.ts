// id.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  private sucursalId = 'sucursal_id'; // Clave para el localStorage

  setId(id: any): any {
    localStorage.setItem(this.sucursalId, id); // Almacena el ID en el localStorage
  }

  getId(): any {
    return localStorage.getItem(this.sucursalId); // Obtiene el ID desde el localStorage
  }
}

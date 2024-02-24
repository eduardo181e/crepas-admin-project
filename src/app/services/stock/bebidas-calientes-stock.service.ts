import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BebidasCalientesStockService {
  API_URI = 'https://crepas-admin-project-api.onrender.com/stock/bebidasCalientes'
  constructor(private http: HttpClient) { }
  getBebidasCalientes(sucursal_id: any){
    return this.http.post((this.API_URI), sucursal_id);
  }

  getBebidaCaliente(id: any, sucursal_id: any){
    return this.http.post((this.API_URI)+ '/'+ id, sucursal_id);
  }

  updateStockBebidaCaliente(id: any, updatedBebida: any){
    return this.http.put((this.API_URI) + '/' + id, updatedBebida);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BebidasCalientesSalesGlobalService {
  API_URI = API_BASE_URL+'/salesGlobal/bebidasCalientes'
  constructor(private http: HttpClient) { }
  getBebidasCalientes(sucursal_id: any){
    return this.http.post((this.API_URI), sucursal_id);
  }

  getBebidaCaliente(id: any){
    return this.http.get((this.API_URI)+ '/'+ id);
  }

  lapsSalesBebidaCaliente(sucursal_id: any){
    return this.http.post((this.API_URI)+'/laps', sucursal_id);
  }
}
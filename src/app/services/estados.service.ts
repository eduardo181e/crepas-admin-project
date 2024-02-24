import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  API_URI = 'https://datos.gob.mx/api/v2/catalog/estados'
  API_URI1 = 'https://datos.gob.mx/api/v2/catalog/paises'

  constructor(private http: HttpClient) { }
  getEstados(){
    return this.http.get(this.API_URI)
  }

  getPaises(){
    return this.http.get(this.API_URI1)
  }
}

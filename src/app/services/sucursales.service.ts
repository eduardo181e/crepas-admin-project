import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  API_URI = API_BASE_URL+'/sucursales'
  constructor(private http: HttpClient) { }
    // Ingrediente Untable
    getSucursales(){
      return this.http.get((this.API_URI)+'/get/');
    }
  
    getSucursal(id: any){
      return this.http.get((this.API_URI)+'/getOne'+ '/'+ id);
    }
  
    deleteSucursal(id: any){
      return this.http.delete((this.API_URI)+'/delete'+ '/'+ id);
    }
  
    saveSucursal(Sucursal:any){
      return this.http.post((this.API_URI)+'/add', Sucursal);
    }
  
    updateSucursal(id: string|number|any, Sucursal: any): Observable<any>{
      return this.http.put((this.API_URI)+'/edit' + '/' + id, Sucursal );
    }

    estados(){
      return this.http.get((this.API_URI)+ '/estados')
    }

    paises(){
      return this.http.get((this.API_URI)+ '/paises')
    }
}

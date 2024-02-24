import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WafflesStockService {
  API_URI = 'https://crepas-admin-project-api.onrender.com/stock/waffles'
  constructor(private http: HttpClient) { }
    // Ingrediente Untable
    getIngredientesUntables(sucursal_id: any){
      return this.http.post((this.API_URI)+ '/IU', sucursal_id);
    }
  
    getIngredienteUntable(id: any, sucursal_id: any){
      return this.http.post((this.API_URI)+ '/IU/'+ id, sucursal_id);
    }
  
    updateStockIngredienteUntable(id: any, updatedUntable: any){
      return this.http.put((this.API_URI) + '/IU/' + id, updatedUntable);
    }
  
    // Ingrediente Complementario
    getIngredientesComplementarios(sucursal_id: any){
      return this.http.post((this.API_URI)+ '/IC', sucursal_id);
    }
  
    getIngredienteComplementario(id: any, sucursal_id: any){
      return this.http.post((this.API_URI)+ '/IC/'+ id, sucursal_id);
    }
  
    updateStockIngredienteComplementario(id: any, updatedComplementario: any){
      return this.http.put((this.API_URI) + '/IC/' + id, updatedComplementario);
    }
  
    // Nieves
  
    getNieves(sucursal_id: any){
      return this.http.post((this.API_URI)+ '/N', sucursal_id);
    }
  
    getNieve(id: any, sucursal_id: any){
      return this.http.post((this.API_URI)+ '/N/'+ id, sucursal_id);
    }
  
    updateStockNieve(id: any, updatedNieve: any){
      return this.http.put((this.API_URI) + '/N/' + id, updatedNieve);
    }
}

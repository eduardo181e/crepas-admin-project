import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CrepaSaladaStockService {
  API_URI = API_BASE_URL+'/stock/crepaSalada'
  constructor(private http: HttpClient) { }

  // Adereso Base
  getAderezosBase(sucursal_id:any){
    return this.http.post((this.API_URI)+ '/AB', sucursal_id);
  }

  getAderezoBase(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/AB/'+ id, sucursal_id);
  }

  updateStockAderezoBase(id: any, updatedAderezoBase: any){
    return this.http.put((this.API_URI) + '/AB/' + id, updatedAderezoBase);
  }

  // Aderezo
  getAderezos(sucursal_id:any){
    return this.http.post((this.API_URI)+ '/A', sucursal_id);
  }

  getAderezo(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/A/'+ id, sucursal_id);
  }

  updateStockAderezo(id: any, updatedAderezo: any){
    return this.http.put((this.API_URI) + '/A/' + id, updatedAderezo);
  }

  // Botana
  getBotanas(sucursal_id:any){
    return this.http.post((this.API_URI)+ '/B', sucursal_id);
  }

  getBotana(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/B/'+ id, sucursal_id);
  }

  updateStockBotana(id: any, updatedBotana: any){
    return this.http.put((this.API_URI) + '/B/' + id, updatedBotana);
  }

  // Ensalada Individual
  getEnsaladasIndividuales(sucursal_id:any){
    return this.http.post((this.API_URI)+ '/EI', sucursal_id);
  }

  getEnsaladaIndividual(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/EI/'+ id, sucursal_id);
  }

  updateStockEnsaladaIndividual(id: any, updatedEnsaladaIndividual: any){
    return this.http.put((this.API_URI) + '/EI/' + id, updatedEnsaladaIndividual);
  }

  // Ingrediente Base
  getIngredientesBase(sucursal_id: any){
    return this.http.post((this.API_URI)+ '/IB', sucursal_id);
  }

  getIngredienteBase(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/IB/'+ id, sucursal_id);
  }

  updateStockIngredienteBase(id: any, updatedIngredienteBase: any){
    return this.http.put((this.API_URI) + '/IB/' + id, updatedIngredienteBase);
  }

  // Ingrediente Principal
  getIngredientesPrincipales(sucursal_id:any){
    return this.http.post((this.API_URI)+ '/IP', sucursal_id);
  }

  getIngredientePrincipal(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/IP/'+ id, sucursal_id);
  }

  updateStockIngredientePrincipal(id: any, updatedIngredientePrincipal: any){
    return this.http.put((this.API_URI) + '/IP/' + id, updatedIngredientePrincipal);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CrepaSaladaSalesService {

  API_URI = API_BASE_URL+'/sales/crepaSalada'
  constructor(private http: HttpClient) { }

  // Adereso
  getAderesos(sucursal_id: any){
    return this.http.post((this.API_URI)+'/A/', sucursal_id);
  }

  getAdereso(id: any){
    return this.http.get((this.API_URI)+ '/A/'+ id);
  }

  lapsSalesAdereso(sucursal_id: any){
    return this.http.post((this.API_URI)+'/A/laps', sucursal_id);
  }

  // Adereso Base

  getAderesosBase(sucursal_id: any){
    return this.http.post((this.API_URI)+'/AB/', sucursal_id);
  }

  getAderesoBase(id: any){
    return this.http.get((this.API_URI)+ '/AB/'+ id);
  }

  lapsSalesAderesoBase(sucursal_id: any){
    return this.http.post((this.API_URI)+'/AB/laps', sucursal_id);
  }

  // Botanas

  getBotanas(sucursal_id: any){
    return this.http.post((this.API_URI)+'/B/', sucursal_id);
  }

  getBotana(id: any){
    return this.http.get((this.API_URI)+ '/B/'+ id);
  }

  lapsSalesBotanas(sucursal_id: any){
    return this.http.post((this.API_URI)+'/B/laps', sucursal_id);
  }

  // Ensalada Individual

  getEnsaladasIndividual(sucursal_id: any){
    return this.http.post((this.API_URI)+'/EI/', sucursal_id);
  }

  getEnsaladaIndividual(id: any){
    return this.http.get((this.API_URI)+ '/EI/'+ id);
  }

  lapsSalesEnsaladaIndividual(sucursal_id: any){
    return this.http.post((this.API_URI)+'/EI/laps', sucursal_id);
  }

  // Ingredientes Base

  getIngredientesBase(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IB/', sucursal_id);
  }

  getIngredienteBase(id: any){
    return this.http.get((this.API_URI)+ '/IB/'+ id);
  }

  lapsSalesIngredientesBase(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IB/laps', sucursal_id);
  }

  // Ingredientes Principal

  getIngredientesPrincipal(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IP/', sucursal_id);
  }

  getIngredientePrincipal(id: any){
    return this.http.get((this.API_URI)+ '/IP/'+ id);
  }

  lapsSalesIngredientesPrincipal(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IP/laps', sucursal_id);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CrepaDulceSalesGlobalService {
  API_URI = API_BASE_URL+'/salesGlobal/crepaDulce'
  constructor(private http: HttpClient) { }

  // Harinas
  getHarinas(sucursal_id: any){
    return this.http.post((this.API_URI)+'/H/', sucursal_id);
  }

  getHarina(id: any){
    return this.http.get((this.API_URI)+ '/H/'+ id);
  }

  lapsSalesHarinas(sucursal_id: any){
    return this.http.post((this.API_URI)+'/H/laps', sucursal_id);
  }

  // Ingredientes Complementarios
  getIngredientesComplementarios(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IC/', sucursal_id);
  }

  getIngredienteComplementario(id: any){
    return this.http.get((this.API_URI)+ '/IC/'+ id);
  }

  lapsSalesIngredientesComplementarios(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IC/laps', sucursal_id);
  }

  // Ingredientes Untables
  getIngredientesUntables(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IU/', sucursal_id);
  }

  getIngredienteUntable(id: any){
    return this.http.get((this.API_URI)+ '/IU/'+ id);
  }

  lapsSalesIngredientesUntables(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IU/laps', sucursal_id);
  }

  // Nieves
  getNieves(sucursal_id: any){
    return this.http.post((this.API_URI)+'/N/', sucursal_id);
  }

  getNieve(id: any){
    return this.http.get((this.API_URI)+ '/N/'+ id);
  }

  lapsSalesNieves(sucursal_id: any){
    return this.http.post((this.API_URI)+'/N/laps', sucursal_id);
  }

    // Decoraciones
    getDecoraciones(sucursal_id: any){
      return this.http.post((this.API_URI)+'/D/', sucursal_id);
    }
  
    getDecoracion(id: any){
      return this.http.get((this.API_URI)+ '/D/'+ id);
    }
  
    lapsSalesDecoraciones(sucursal_id: any){
      return this.http.post((this.API_URI)+'/D/laps', sucursal_id);
    }

}

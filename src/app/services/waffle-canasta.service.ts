import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class WaffleCanastaService {
  API_URI = API_BASE_URL+'/waffleCanasta'
  constructor(private http: HttpClient) { }
      // Ingrediente Untable
      getIngredientesU(){
        return this.http.get((this.API_URI)+'/IU/');
      }
    
      getIngredienteU(id: any){
        return this.http.get((this.API_URI)+'/IU'+ '/'+ id);
      }
    
      deleteIngredienteU(id: any){
        return this.http.delete((this.API_URI)+'/IU'+ '/'+ id);
      }
    
      saveIngredienteU(ingrediente:any){
        return this.http.post((this.API_URI)+'/IU', ingrediente);
      }
    
      updateIngredienteU(id: string|number|any, ingrediente: any): Observable<any>{
        return this.http.put((this.API_URI)+'/IU' + '/' + id, ingrediente );
      }
      // Ingrediente Complementario
      getIngredientesC(){
        return this.http.get((this.API_URI)+'/IC/');
      }
    
      getIngredienteC(id: any){
        return this.http.get((this.API_URI)+'/IC'+ '/'+ id);
      }
    
      deleteIngredienteC(id: any){
        return this.http.delete((this.API_URI)+'/IC'+ '/'+ id);
      }
    
      saveIngredienteC(ingrediente:any){
        return this.http.post((this.API_URI)+'/IC', ingrediente);
      }
    
      updateIngredienteC(id: string|number|any, ingrediente: any): Observable<any>{
        return this.http.put((this.API_URI)+'/IC' + '/' + id, ingrediente );
      }
      // Nieve
      getNieves(){
        return this.http.get((this.API_URI)+'/N/');
      }
    
      getNieve(id: any){
        return this.http.get((this.API_URI)+'/N'+ '/'+ id);
      }
    
      deleteNieve(id: any){
        return this.http.delete((this.API_URI)+'/N'+ '/'+ id);
      }
    
      saveNieve(nieve:any){
        return this.http.post((this.API_URI)+'/N', nieve);
      }
    
      updateNieve(id: string|number|any, nieve: any): Observable<any>{
        return this.http.put((this.API_URI)+'/N' + '/' + id, nieve );
      }
      // Decoracion
      getDecoraciones(){
      return this.http.get((this.API_URI)+'/D/');
      }

      getDecoracion(id: any){
      return this.http.get((this.API_URI)+'/D'+ '/'+ id);
      }


      updateDecoracion(id: string|number|any, nieve: any): Observable<any>{
      return this.http.put((this.API_URI)+'/D' + '/' + id, nieve );
      }
}

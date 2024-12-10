import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { precio } from '../models/precio';
import { API_BASE_URL } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CrepaDulceService {
  API_URI = API_BASE_URL+'/crepaDulce'
  constructor(private http: HttpClient) { }
  // Harinas
  getHarinas(){
    return this.http.get((this.API_URI)+'/H/');
  }

  getHarina(id: any){
    return this.http.get((this.API_URI)+'/H'+ '/'+ id);
  }

  deleteHarina(id: any){
    return this.http.delete((this.API_URI)+'/H'+ '/'+ id);
  }

  saveHarina(harina:any){
    return this.http.post((this.API_URI)+'/H', harina);
  }

  updateHarina(id: string|number|any, harina: any): Observable<any>{
    return this.http.put((this.API_URI)+'/H' + '/' + id, harina );
  }

  // Ingredientes Untables
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

  // Ingredientes Complementarios
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

  saveNieve(ingrediente:any){
    return this.http.post((this.API_URI)+'/N', ingrediente);
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
    // Precios
  getPrecios(){
    return this.http.get((this.API_URI)+'/P/');
  }

  getPrecio(id: any){
    return this.http.get((this.API_URI)+'/P'+ '/'+ id);
  }

  deletePrecio(id: any){
    return this.http.delete((this.API_URI)+'/P'+ '/'+ id);
  }

  savePrecio(Precio:precio){
    return this.http.post((this.API_URI)+'/P', Precio);
  }

  updatePrecio(id: string|number|any, precio: precio): Observable<any>{
    return this.http.put((this.API_URI)+'/P' + '/' + id, precio );
  }
}

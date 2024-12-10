import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { precio } from '../models/precio';
import { ensalada } from '../models/ensalada_ind';
import { botana } from '../models/botana';
import { API_BASE_URL } from './environment';
@Injectable({
  providedIn: 'root'
})
export class CrepaSaladaService {
  API_URI = API_BASE_URL+'/crepaSalada'
  constructor(private http: HttpClient) { }
    // Ingrediente Principal
    getIngredientesP(){
      return this.http.get((this.API_URI)+'/IP/');
    }
  
    getIngredienteP(id: any){
      return this.http.get((this.API_URI)+'/IP'+ '/'+ id);
    }
  
    deleteIngredienteP(id: any){
      return this.http.delete((this.API_URI)+'/IP'+ '/'+ id);
    }
  
    saveIngredienteP(ingrediente:any){
      return this.http.post((this.API_URI)+'/IP', ingrediente);
    }
  
    updateIngredienteP(id: string|number|any, ingrediente: any): Observable<any>{
      return this.http.put((this.API_URI)+'/IP' + '/' + id, ingrediente );
    }
    // Aderesos
    getAderesos(){
      return this.http.get((this.API_URI)+'/A/');
    }
  
    getAdereso(id: any){
      return this.http.get((this.API_URI)+'/A'+ '/'+ id);
    }
  
    deleteAdereso(id: any){
      return this.http.delete((this.API_URI)+'/A'+ '/'+ id);
    }
  
    saveAdereso(Adereso:any){
      return this.http.post((this.API_URI)+'/A', Adereso);
    }
  
    updateAdereso(id: string|number|any, Adereso: any): Observable<any>{
      return this.http.put((this.API_URI)+'/A' + '/' + id, Adereso );
    }
    // Ensalada Individula
    getEnsaladas(){
      return this.http.get((this.API_URI)+'/EI/');
    }
  
    getEnsalada(id: any){
      return this.http.get((this.API_URI)+'/EI'+ '/'+ id);
    }
  
    deleteEnsalada(id: any){
      return this.http.delete((this.API_URI)+'/EI'+ '/'+ id);
    }
  
    saveEnsalada(ensalada:ensalada){
      return this.http.post((this.API_URI)+'/EI', ensalada);
    }
  
    updateEnsalada(id: string|number|any, ensalada: ensalada): Observable<any>{
      return this.http.put((this.API_URI)+'/EI' + '/' + id, ensalada );
    }
    // Botana
    getBotanas(){
      return this.http.get((this.API_URI)+'/B/');
    }
  
    getBotana(id: any){
      return this.http.get((this.API_URI)+'/B'+ '/'+ id);
    }
  
    deleteBotana(id: any){
      return this.http.delete((this.API_URI)+'/B'+ '/'+ id);
    }
  
    saveBotana(boatna:botana){
      return this.http.post((this.API_URI)+'/B', boatna);
    }
  
    updateBotana(id: string|number|any, botana: botana): Observable<any>{
      return this.http.put((this.API_URI)+'/B' + '/' + id, botana );
    }
    // Precio
    getPrecios(){
      return this.http.get((this.API_URI)+'/P/');
    }
  
    getPrecio(id: any){
      return this.http.get((this.API_URI)+'/P'+ '/'+ id);
    }
  
    deletePrecio(id: any){
      return this.http.delete((this.API_URI)+'/P'+ '/'+ id);
    }
  
    savePrecio(precio:precio){
      return this.http.post((this.API_URI)+'/P', precio);
    }
  
    updatePrecio(id: string|number|any, precio: precio): Observable<any>{
      return this.http.put((this.API_URI)+'/P' + '/' + id, precio );
    }

    // Adereso Base
    getAderesosB(){
      return this.http.get((this.API_URI)+'/AB/');
    }

    getAderesoB(id: any){
      return this.http.get((this.API_URI)+'/AB'+ '/'+ id);
    }

    deleteAderesoB(id: any){
      return this.http.delete((this.API_URI)+'/AB'+ '/'+ id);
    }

    saveAderesoB(Adereso:any){
      return this.http.post((this.API_URI)+'/AB', Adereso);
    }

    updateAderesoB(id: string|number|any, Adereso: any): Observable<any>{
      return this.http.put((this.API_URI)+'/AB' + '/' + id, Adereso );
    }

    // Ingrediente Base

    getIngredientesB(){
      return this.http.get((this.API_URI)+'/IB/');
    }

    getIngredienteB(id: any){
      return this.http.get((this.API_URI)+'/IB'+ '/'+ id);
    }

    deleteIngredienteB(id: any){
      return this.http.delete((this.API_URI)+'/IB'+ '/'+ id);
    }

    saveIngredienteB(ingrediente:any){
      return this.http.post((this.API_URI)+'/IB', ingrediente);
    }

    updateIngredienteB(id: string|number|any, ingrediente: any): Observable<any>{
      return this.http.put((this.API_URI)+'/IB' + '/' + id, ingrediente );
    }
}

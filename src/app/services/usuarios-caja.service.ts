import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioC } from '../models/usuarioCaja';
import { API_BASE_URL } from './environment';
@Injectable({
  providedIn: 'root'
})
export class UsuariosCajaService {
  API_URI = API_BASE_URL+'/caja'
  constructor(private http: HttpClient) { }
    // Ingrediente Untable
    getUsuarios(){
      return this.http.get((this.API_URI)+'/usuarios/');
    }
  
    getUsuario(id: any){
      return this.http.get((this.API_URI)+'/usuarios'+ '/'+ id);
    }
  
    deleteUsuario(id: any){
      return this.http.delete((this.API_URI)+'/usuarios'+ '/'+ id);
    }
  
    saveUsuario(usuario:usuarioC){
      return this.http.post((this.API_URI)+'/new', usuario);
    }
  
    updateUsuario(id: string|number|any, usuario: usuarioC): Observable<any>{
      return this.http.put((this.API_URI)+'/usuarios' + '/' + id, usuario );
    }
}

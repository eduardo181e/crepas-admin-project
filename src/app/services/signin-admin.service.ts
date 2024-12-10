import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL } from './environment';

interface LoginResponse {
  token: string;
}

interface ErrorResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SigninAdminService {
  API_URI = API_BASE_URL+'/authentication'
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Realiza la solicitud HTTP para iniciar sesión y recibir el token
    return this.http.post<any>((this.API_URI)+ '/signin', { username, password })
      .pipe(
        tap(response => {
          if (response.token) {
            // Almacena el token en LocalStorage
            localStorage.setItem('token', response.token);
            console.log(response.token);
          }
        }),
        catchError(this.handleError)
      );
  }
  signUp(username: string, password: string, fullname: string, lang:any): Observable<any> {
    // Realiza la solicitud HTTP para iniciar sesión y recibir el token
    return this.http.post<any>((this.API_URI)+ '/signup', { username, password, fullname, lang })
      .pipe(
        tap(response => {
          if (response.token) {
            // Almacena el token en LocalStorage
            localStorage.setItem('token', response.token);
            console.log(response.token);
          }
        }),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del servidor
      console.error(
        `El servidor devolvió el código ${error.status}, ` +
        `el cuerpo del error fue: ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error orientado al usuario
    return throwError(error);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>((this.API_URI)+ '/changePassword', {newPassword, oldPassword})
    .pipe(
      tap(response => {
        if (response.token) {
          // Almacena el token en LocalStorage
          localStorage.setItem('token', response.token);
          console.log(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }
  changeUsername( newUsername: string, fullname : string): Observable<any> {
    return this.http.post<any>((this.API_URI)+ '/changeUsername', { newUsername, fullname})
    .pipe(
      tap(response => {
        if (response.token) {
          // Almacena el token en LocalStorage
          localStorage.setItem('token', response.token);
          console.log(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  changelang( newLang: string): Observable<any> {
    return this.http.post<any>((this.API_URI)+ '/changeLang', {newLang})      
    .pipe(
      tap(response => {
        if (response.token) {
          // Almacena el token en LocalStorage
          localStorage.setItem('token', response.token);
          console.log(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }
}

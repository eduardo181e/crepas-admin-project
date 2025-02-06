import { Component } from '@angular/core';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslateService } from 'src/app/translate/translate.service';
@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent {

  username: string = ''
  password: string = ''
  fullname: string = ''
  lang: string = ''
  
errorMessage: string = '';

  constructor(private signinAdminService: SigninAdminService, private router: Router, private alertService: AlertDialogService, private translateService: TranslateService){}
  async changeLanguage(language: string) {
    await this.translateService.getData('assets/i18n/', language);
  }
  Login2(){
    console.log(this.password, this.username)
  }
  
  Login() {
    if(this.lang === 'en' || this.lang === ''){
      if(this.username === '' && this.password === '' &&  this.fullname === '' ){
        this.alertService.mostrarAlerta('Enter a username and password');
      }else{
        if((this.username === '' && this.password === '' &&  this.fullname !== '')||(this.username === '' && this.password !== '' &&  this.fullname === '')||(this.username !== '' && this.password === '' &&  this.fullname === '')){
          this.alertService.mostrarAlerta('Please provide all necessary information');

        }else if(this.username === '' && this.password !== '' &&  this.fullname !== ''){
        this.alertService.mostrarAlerta('Enter a username');
      }else if(this.password === '' && this.username !== '' &&  this.fullname !== ''){
        this.alertService.mostrarAlerta('Enter a password');
      }else if(this.fullname === '' && this.username !== '' &&  this.password !== ''){
        this.alertService.mostrarAlerta('Enter your full name')
      } else if(this.lang === '' && this.username !== '' &&  this.password !== '' && this.fullname !== ''){
        this.alertService.mostrarAlerta('Select a language')
      }else{
      this.signinAdminService.signUp(this.username, this.password, this.fullname, this.lang).pipe(
        catchError(error => {
          // Maneja el error aquí
          if(error.error.message === '404'){
              
            this.alertService.mostrarAlerta( 'The user already exists');
            }
          return throwError(error); // Lanza el error nuevamente
        })
      ).subscribe(
    
        (res: any) => {
          if (res.token) {
            const tokenData = res.token.split('.')[1]; // Obtén la parte de los datos del token
            const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
    
            // Accede a los datos del usuario
            const userData = {
              fullname: decodedTokenData.fullname,
              username: decodedTokenData.username,
              id: decodedTokenData.id,
              lang: decodedTokenData.lang
              // Agrega otros datos del usuario si los necesitas
            };
            console.log(userData)
            this.changeLanguage(userData.lang)
            
          this.alertService.mostrarAlerta('Welcome ' + userData.fullname)
    
            // Redirige a la ruta deseada con los datos del usuario
            this.router.navigate(['principal'])
          }
        }
      );
    }      
      }  
    }else if (this.lang === 'es'){
         if(this.username === '' && this.password === '' &&  this.fullname === '' ){
      this.alertService.mostrarAlerta('Ingresa un usuario y contraseña');
    }else{
      if((this.username === '' && this.password === '' &&  this.fullname !== '')||(this.username === '' && this.password !== '' &&  this.fullname === '')||(this.username !== '' && this.password === '' &&  this.fullname === '')){
        this.alertService.mostrarAlerta('Por favor proporciona toda la información necesaria');

      }else if(this.username === '' && this.password !== '' &&  this.fullname !== ''){
      this.alertService.mostrarAlerta('Ingresa un usuario');
    }else if(this.password === '' && this.username !== '' &&  this.fullname !== ''){
      this.alertService.mostrarAlerta('Ingresa una contraseña');
    }else if(this.fullname === '' && this.username !== '' &&  this.password !== ''){
      this.alertService.mostrarAlerta('Ingresa tu nombre completo')
    }else{
    this.signinAdminService.signUp(this.username, this.password, this.fullname, this.lang).pipe(
      catchError(error => {
        // Maneja el error aquí
        if(error.error.message === '404'){
              
          this.alertService.mostrarAlerta( 'El usuario ya existe');
          }
        return throwError(error); // Lanza el error nuevamente
      })
    ).subscribe(
  
      (res: any) => {
        if (res.token) {
          const tokenData = res.token.split('.')[1]; // Obtén la parte de los datos del token
          const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
  
          // Accede a los datos del usuario
          const userData = {
            fullname: decodedTokenData.fullname,
            username: decodedTokenData.username,
            id: decodedTokenData.id,
            lang: decodedTokenData.lang
            // Agrega otros datos del usuario si los necesitas
          };
          console.log(userData)
          this.changeLanguage(userData.lang)
          this.alertService.mostrarAlerta('Bienvenido ' + userData.fullname)
          // Redirige a la ruta deseada con los datos del usuario
          this.router.navigate(['principal'])
        }
      }
    );
  }      
    }  
    }

    }
}

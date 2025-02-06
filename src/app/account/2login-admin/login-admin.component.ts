import { Component } from '@angular/core';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslateService } from 'src/app/translate/translate.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  username: string = ''
  password: string = ''
  token: any = ''
  
errorMessage: string = '';

  constructor(private signinAdminService: SigninAdminService, private router: Router, private alertService: AlertDialogService, private translateService: TranslateService){
    console.log(this.translateService.getTranslate('hello.world'));
  }
  async changeLanguage(language: string) {
    await this.translateService.getData('assets/i18n/', language);
  }
  Login2(){
    console.log(this.password, this.username)
  }
  
  Login() {
    this.token = localStorage.getItem('token');
    if(this.token === null || this.token === undefined || this.token === ''){
      if(this.username === '' && this.password === ''){
        this.alertService.mostrarAlerta('Enter a username and password');
      }else{
           if(this.username === ''){
        this.alertService.mostrarAlerta('Enter a username');
      }else if(this.password === ''){
        this.alertService.mostrarAlerta('Enter a password');
      }else{
        this.signinAdminService.login(this.username, this.password).pipe(
          catchError(error => {
            // Maneja el error aquí

              if(error.error.message === '404'){
              
                this.alertService.mostrarAlerta( 'Username does not exist');
                }else if(error.error.message === '405'){
                  this.alertService.mostrarAlerta( 'Incorrect password');
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
              // Redirige a la ruta deseada con los datos del usuario
              this.router.navigate(['principal'])
              const language = userData.lang;
              if(language === 'es'){
                this.alertService.mostrarAlerta('Bienvenido ' + userData.fullname)
                }else{
                  this.alertService.mostrarAlerta('Welcome ' + userData.fullname)
                }
            }
          }
        );
      }
    }
  } else {
     const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
  const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
  console.log(tokenData)
  // Accede a los datos del usuario
  const userData = {
  
    lang: decodedTokenData.lang,
    // Agrega otros datos del usuario si los necesitas
  };     
  const language = userData.lang;
  
  if(language === 'es'){
      if(this.username === '' && this.password === ''){
        this.alertService.mostrarAlerta('Ingresa un usuario y contraseña');
      }else{
           if(this.username === ''){
        this.alertService.mostrarAlerta('Ingresa un usuario');
      }else if(this.password === ''){
        this.alertService.mostrarAlerta('Ingresa una contraseña');
      }else {
        this.signinAdminService.login(this.username, this.password).pipe(
          catchError(error => {
            // Maneja el error aquí
            if(error.error.message === '404'){
              
            this.alertService.mostrarAlerta( 'El usuario no existe');
            }else if(error.error.message === '405'){
              this.alertService.mostrarAlerta( 'Contraseña incorrecta');
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
              // Redirige a la ruta deseada con los datos del usuario
              this.router.navigate(['principal'])
              if(language === 'es'){
              this.alertService.mostrarAlerta('Bienvenido ' + userData.fullname)
              }else{
                this.alertService.mostrarAlerta('Welcome ' + userData.fullname)
              }
            }
          }
        );
      }
    
  }      
    } else if(language === 'en'){
      if(this.username === '' && this.password === ''){
        this.alertService.mostrarAlerta('Enter a username and password');
      }else{
           if(this.username === ''){
        this.alertService.mostrarAlerta('Enter a username');
      }else if(this.password === ''){
        this.alertService.mostrarAlerta('Enter a password');
      }else{
        this.signinAdminService.login(this.username, this.password).pipe(
          catchError(error => {
            // Maneja el error aquí

              if(error.error.message === '404'){
              
                this.alertService.mostrarAlerta( 'Username does not exist');
                }else if(error.error.message === '405'){
                  this.alertService.mostrarAlerta( 'Incorrect password');
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
              // Redirige a la ruta deseada con los datos del usuario
              this.router.navigate(['principal'])
              if(language === 'es'){
                this.alertService.mostrarAlerta('Bienvenido ' + userData.fullname)
                }else{
                  this.alertService.mostrarAlerta('Welcome ' + userData.fullname)
                }
            }
          }
        );
      }
    }
    }
  }

 

    }

}

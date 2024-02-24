import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { TranslateService } from 'src/app/translate/translate.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private signinAdminService: SigninAdminService, private router: Router, private alertService: AlertDialogService, private translateService: TranslateService) { }
oldPassword:any = ''
newPassword:any = ''
token:any
ngOnInit(){
  this.token = localStorage.getItem('token');
  const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
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
}
  updatePassword(){
    this.token = localStorage.getItem('token');
    const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
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
    if(this.oldPassword === ''){
      if(userData.lang === 'es'){
        this.alertService.mostrarAlerta('Ingresa tu contraseña actual');
      }else if(userData.lang === 'en'){
        this.alertService.mostrarAlerta('Enter your current password');
      }
  }else if(this.newPassword === ''){
    if(userData.lang === 'es'){
      this.alertService.mostrarAlerta('Ingresa tu contraseña nueva');
    }else if(userData.lang === 'en'){
      this.alertService.mostrarAlerta('Enter your new password');
    }
  }else{
        if(this.oldPassword === this.newPassword){
      if(userData.lang === 'es'){
        this.alertService.mostrarAlerta('La contraseña nueva no puede ser igual a la anterior');
      }else if(userData.lang === 'en'){
        this.alertService.mostrarAlerta('The new password cannot be the same as the previous one');
      }
    }else{

    this.signinAdminService.changePassword(this.oldPassword, this.newPassword).subscribe(
      res => {
        if(userData.lang === 'es'){
          this.alertService.mostrarAlerta('Contraseña actualizada correctamente');
        }
        else{
          this.alertService.mostrarAlerta('Password updated correctly');
        }
        this.router.navigate(['accountConfig'])
      },
      err => {

        if(err.error.message === 'Token expired'){        if(err.error.message === 'Token expired'){
          this.token = localStorage.getItem('token');
          const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
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
          if(userData.lang === 'es'){
          this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
          }else if(userData.lang === 'en'){
            this.alertService.mostrarAlerta('Your session has expired, log in again');
          }
          this.router.navigate(['admin']);
        }
        }else {
          if(userData.lang === 'es'){
            if(err.error.message === '406'){
              this.alertService.mostrarAlerta('Token inválido');
            }else if (err.error.message === '405'){
              this.alertService.mostrarAlerta('Contraseña incorrecta');
            }
          }else if(userData.lang === 'en'){
            if(err.error.message === '406'){
              this.alertService.mostrarAlerta('Invalid token');
            }else if (err.error.message === '405'){
              this.alertService.mostrarAlerta('Incorrect password');
            }
          }
        }
      }
      )
    
  }
}}
}

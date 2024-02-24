import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

@Component({
  selector: 'app-create-form-crepa-salada-botana',
  templateUrl: './create-form-crepa-salada-botana.component.html',
  styleUrls: ['./create-form-crepa-salada-botana.component.css']
})
export class CreateFormCrepaSaladaBotanaComponent {
  botana: any= {
    precio: 0,
    botana: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewBotana(){
    const credent = this.missinCredentials();
    if((this.botana.botana == '' && this.botana.descripcion == '' && this.botana.precio == 0 && this.botana.inventario == '')|| (credent == true)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.botana.botana == '' && this.botana.descripcion !== '' && this.botana.precio !== 0 && this.botana.inventario !== '' ){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la botana');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the snack');
      }
    }else if(this.botana.precio == 0 && this.botana.descripcion !== '' && this.botana.botana !== '' && this.botana.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un precio');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter a price');
      }
    }else if(this.botana.inventario == '' && this.botana.precio !== 0 && this.botana.descripcion !== '' && this.botana.botana !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.saveBotana(this.botana).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Botana creada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Snack created correctly');
          }
        this.router.navigate(['/crepaSaladaBotana']);
      },
      err => {
        if(err.error.message === 'Token expired'){
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('Your session has expired, please log in again');
            }
          this.router.navigate(['admin']);
        }
        }
    )      
    }

  }

  missinCredentials() {
    const arr = [];
    if(this.botana.botana == ''){
      arr.push(true)
    }else if(this.botana.botana !=='') {
      arr.push(false)
    }
    if(this.botana.precio == ''){
      arr.push(true)
    }else if(this.botana.precio !== ''){
      arr.push(false)
    }
    if(this.botana.inventario == ''){
      arr.push(true)
    }else if(this.botana.inventario !== ''){
      arr.push(false)
    }
  
    var cont = 0
    arr.forEach(i => {
        if(i == true){
          cont++;
        }
    })
  
    if(cont > 1){
      return true
    }else{
      return false
    }
  }
}

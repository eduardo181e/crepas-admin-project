import { Component } from '@angular/core';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-create-form-crepa-dulce-nieve',
  templateUrl: './create-form-crepa-dulce-nieve.component.html',
  styleUrls: ['./create-form-crepa-dulce-nieve.component.css']
})
export class CreateFormCrepaDulceNieveComponent {
  nieve: any= {
    nieve: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaDulceService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewNieve(){
    if(this.nieve.nieve == '' && this.nieve.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.nieve.nieve == '' && this.nieve.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la nieve');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the snow');
      }
    }else if(this.nieve.inventario == '' && this.nieve.nieve !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.saveNieve(this.nieve).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Nieve guardada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ice cream saved correctly');
          }
        this.router.navigate(['/crepaDulceNieve']);
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
}

import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-adereso-base-create-form',
  templateUrl: './adereso-base-create-form.component.html',
  styleUrls: ['./adereso-base-create-form.component.css']
})
export class AderesoBaseCreateFormComponent {
  adereso: any= {
    adereso_base: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewAdereso(){
    if(this.adereso.adereso_base == '' && this.adereso.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.adereso.adereso_base == '' && this.adereso.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de el aderezo');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the dressing');
      }
    }else if(this.adereso.inventario == '' && this.adereso.adereso_base !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.saveAderesoB(this.adereso).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Aderezo creado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Dressing created correctly');
          }
        this.router.navigate(['/crepaSaladaAderesosBase']);
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

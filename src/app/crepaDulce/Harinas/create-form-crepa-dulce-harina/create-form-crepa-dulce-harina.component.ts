import { Component } from '@angular/core';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-create-form-crepa-dulce-harina',
  templateUrl: './create-form-crepa-dulce-harina.component.html',
  styleUrls: ['./create-form-crepa-dulce-harina.component.css']
})
export class CreateFormCrepaDulceHarinaComponent {
  harina: any= {
    harina: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaDulceService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewHarina(){
    console.log(this.harina);
    if(this.harina.harina == '' && this.harina.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.harina.harina == '' && this.harina.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la harina');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the flour');
      }
    }else if(this.harina.inventario == '' && this.harina.harina !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.saveHarina(this.harina).subscribe(
      res =>{
        console.log(this.harina);
        console.log(res);
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Harina guardada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Flour saved correctly');
          }
        this.router.navigate(['/crepaDulceHarina']);
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

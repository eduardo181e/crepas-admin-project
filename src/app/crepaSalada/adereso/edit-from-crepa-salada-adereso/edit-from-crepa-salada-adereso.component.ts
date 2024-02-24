import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-edit-from-crepa-salada-adereso',
  templateUrl: './edit-from-crepa-salada-adereso.component.html',
  styleUrls: ['./edit-from-crepa-salada-adereso.component.css']
})
export class EditFromCrepaSaladaAderesoComponent {
  adereso1: any = [];

  adereso:any = {
    id: 0,
    adereso: '',
    inventario: ''
  }

  edit: boolean = false;
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getAdereso(id)
      .subscribe(
        res => {
          console.log(res);
          this.adereso1 = res;
          console.log(this.adereso1[0]);
          this.adereso = this.adereso1[0];
          this.edit = true;
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
  updateAdereso(){   
    if(this.adereso.adereso == '' && this.adereso.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.adereso.adereso == '' && this.adereso.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de el aderezo');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the dressing');
      }
    }else if(this.adereso.inventario == '' && this.adereso.adereso !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.updateAdereso(this.adereso.id, this.adereso).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Aderezo actualizado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Dressing updated correctly');
          }
        this.router.navigate(['/crepaSaladaAdereso']);
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

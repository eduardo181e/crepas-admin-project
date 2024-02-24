import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

@Component({
  selector: 'app-edit-form-nives',
  templateUrl: './edit-form-nives.component.html',
  styleUrls: ['./edit-form-nives.component.css']
})
export class EditFormNivesWaffleCanastaComponent {
  nieve1: any = [];

  nieve:any = {
    id: 0,
    nieve: ''
  }

  edit: boolean = false;
  constructor(private service: WaffleCanastaService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getNieve(id)
      .subscribe(
        res => {
          console.log(res);
          this.nieve1 = res;
          console.log(this.nieve1[0]);
          this.nieve = this.nieve1[0];
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
  updatenieve(){    
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
    this.service.updateNieve(this.nieve.id, this.nieve).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Nieve actualizada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ice cream updated correctly');
          }
        this.router.navigate(['/wafflesCanastaNieve']);
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
    )}
  }
}

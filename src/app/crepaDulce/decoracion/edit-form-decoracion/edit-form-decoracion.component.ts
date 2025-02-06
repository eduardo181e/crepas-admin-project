import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';

@Component({
  selector: 'app-edit-form-decoracion',
  templateUrl: './edit-form-decoracion.component.html',
  styleUrls: ['./edit-form-decoracion.component.css']
})
export class EditFormDecoracionCrepaDulceComponent {
  decoracion1: any = [];

  decoracion:any = {
    id: 0,
    decoracion: ''
  }

  edit: boolean = false;
  constructor(private service: CrepaDulceService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getDecoracion(id)
      .subscribe(
        res => {
          console.log(res);
          this.decoracion1 = res;
          console.log(this.decoracion1[0]);
          this.decoracion = this.decoracion1[0];
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
  updateDecoracion(){    
    if(this.decoracion.decoracion == '' && this.decoracion.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.decoracion.decoracion == '' && this.decoracion.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la decoracion');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the snow');
      }
    }else if(this.decoracion.inventario == '' && this.decoracion.decoracion !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.updateDecoracion(this.decoracion.id, this.decoracion).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('decoracion actualizada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('decoracion updated correctly');
          }
        this.router.navigate(['/crepaDulceDecoracion']);
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

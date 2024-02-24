import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

@Component({
  selector: 'app-edit-form-crepa-salada-precio',
  templateUrl: './edit-form-crepa-salada-precio.component.html',
  styleUrls: ['./edit-form-crepa-salada-precio.component.css']
})
export class EditFormCrepaSaladaPrecioComponent {
  precio1: any = [];

  precio:any = {
    id: 0,
    precio: '',
    desrcipcion: ''
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
      this.service.getPrecio(id)
      .subscribe(
        res => {
          console.log(res);
          this.precio1 = res;
          console.log(this.precio1[0]);
          this.precio = this.precio1[0];
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
  updatePrecio(){  
    if(this.precio.precio == 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor coloca un precio válido');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Please enter a valid price');
        }
    }  
    this.service.updatePrecio(this.precio.id, this.precio).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Precio actualizado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Price updated correctly');
          }
        this.router.navigate(['/crepaSaladaPrecio']);
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

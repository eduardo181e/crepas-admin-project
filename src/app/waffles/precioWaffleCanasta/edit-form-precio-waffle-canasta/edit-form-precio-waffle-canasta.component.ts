import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-edit-form-precio-waffle-canasta',
  templateUrl: './edit-form-precio-waffle-canasta.component.html',
  styleUrls: ['./edit-form-precio-waffle-canasta.component.css']
})
export class EditFormPrecioWaffleCanastaComponent {
  precio1: any = [];

  precio:any = {
    id: 0,
    precio: '',
    desrcipcion: ''
  }

  edit: boolean = false;
  constructor(private service: WaflesService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getPrecio1(id)
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
    this.service.updatePrecio1(this.precio.id, this.precio).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Precio actualizado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Price updated correctly');
          }
        this.router.navigate(['/wafflesCanastaPrecio']);
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
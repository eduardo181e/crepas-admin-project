import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent {
  @HostBinding('class') classes = 'row'
  sucursales:any = [];
  authService: any = {};
  constructor(private router: Router, private service: SucursalesService, private idService: IdService, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit(){
    this.service.getSucursales().subscribe(
      res => {
        console.log(res);
        this.sucursales = res;
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
  deleteSucursal(id:any){
    this.service.deleteSucursal(id).subscribe(
      res => {
        console.log(res);
        this.service.getSucursales().subscribe(
          res => {
            this.sucursales = res;
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
  navigateCreate(){
    this.router.navigate(['createSucursal'])
  }

  administraSucursal(id:any){
    this.idService.setId(id);
    this.router.navigate(['/adminSucursal'])

  }
  facturas1(){
    if(this.sucursales.length === 0){
      return false;
     }else{
    return true;
    }
  }
}

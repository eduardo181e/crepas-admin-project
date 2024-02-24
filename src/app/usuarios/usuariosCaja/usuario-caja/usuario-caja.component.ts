import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuariosCajaService } from 'src/app/services/usuarios-caja.service';


@Component({
  selector: 'app-usuario-caja',
  templateUrl: './usuario-caja.component.html',
  styleUrls: ['./usuario-caja.component.css']
})
export class UsuarioCajaComponent implements OnInit {
  @HostBinding('class') classes = 'row'
  nombreSucur:any = [];
  sucursales:any = [];
  sucursal:any;
  usuarios:any = [];
  id:any = [];
  constructor(private router: Router, private service: UsuariosCajaService, private sucursalS: SucursalesService, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit() {
    this.service.getUsuarios().subscribe(
      (res: any) => {
        this.usuarios = res;
        this.loadSucursales();
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
    );
  }

  loadSucursales() {
    this.usuarios.forEach((usuario: any, index: number) => {
      const id = usuario.sucursal_id;
      this.sucursalS.getSucursal(id).subscribe(
        (res: any) => {
          this.sucursales[index] = res; // Asignar la sucursal en el índice correcto
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
      );
    });
  }
  deleteUsuario(id:any){
    this.service.deleteUsuario(id).subscribe(
      res => {
        console.log(res);
        this.service.getUsuarios().subscribe(
          res => {
            this.usuarios = res;
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
    this.router.navigate(['createUsuarioCaja'])
  }

  facturas1(){
    if(this.usuarios.length === 0){
      return false;
     }else{
    return true;
    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { usuarioC } from 'src/app/models/usuarioCaja';
import { AuthService } from 'src/app/services/auth-service.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuariosCajaService } from 'src/app/services/usuarios-caja.service';
@Component({
  selector: 'app-create-form-usuario-caja',
  templateUrl: './create-form-usuario-caja.component.html',
  styleUrls: ['./create-form-usuario-caja.component.css']
})
export class CreateFormUsuarioCajaComponent {
  usuario:usuarioC = {
    id: 0,
    username: '',
    password: '',
    fullname: '',
    numero_caja: 0,
    sucursal_id: 0
  }
  sucursales:any;
  sucurUsers:any;
  namesucursal:any;
  constructor(private router: Router, private service: UsuariosCajaService, private sucursalesS: SucursalesService, private alertService: AlertDialogService, private authService: AuthService){}
  createNewUser(){
    if (!this.usuario.username || !this.usuario.fullname || !this.usuario.password || !this.usuario.numero_caja || !this.usuario.sucursal_id) {
      this.alertService.mostrarAlerta('Por favor, llena todos los campos');
      return;
  }

  if (this.usuario.numero_caja < 0) {
      alert('El número de caja no puede ser negativo');
      return;
  }
    this.sucursalesS.getSucursal(this.usuario.sucursal_id).subscribe(
      res => {
        console.log(res)
        this.sucurUsers = res;
        this.namesucursal = this.sucurUsers[0].nombre
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
    console.log(this.usuario)

    
    delete this.usuario.id;
    this.service.saveUsuario(this.usuario).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Usuario creado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('User created correctly');
          }
        this.router.navigate(['/usuarioCaja']);
      },
      err => {
              if(err.error.message === 'Token expired'){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('Your session has expired, please log in again');
                  }
                this.router.navigate(['admin']);
              }              else{
                this.alertService.mostrarAlerta(err.error.text);
              }
              }
    )

  }
  sucursal(){
    if(!this.usuario.sucursal_id ){
      console.log('selecciona algo')
    }else{
          this.sucursalesS.getSucursal(this.usuario.sucursal_id).subscribe(
      res => {
        console.log(res)
        this.sucurUsers = res;
        this.namesucursal = this.sucurUsers[0].nombre
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
    console.log(this.usuario)
    }

  }

  ngOnInit() {
    this.sucursalesS.getSucursales().subscribe(
      res => {
        console.log(res)
        this.sucursales = res
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

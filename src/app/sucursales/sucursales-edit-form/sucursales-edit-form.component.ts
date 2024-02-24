import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { SucursalesService } from 'src/app/services/sucursales.service';


@Component({
  selector: 'app-sucursales-edit-form',
  templateUrl: './sucursales-edit-form.component.html',
  styleUrls: ['./sucursales-edit-form.component.css']
})
export class SucursalesEditFormComponent {
  sucursal1:any = {
    direccion: {},
    nombre: {}
  };
  respuesta:any;
  sucursal:any = {
    nombre: '',
  };
  direccion:any = {
    nombre: '',
    numero: 0,
    calle: '',
    ciudad: '',
    estado: '',
    pais: '',
    telefono: 0
  };
  paises:any;
  estados: any;
  authService: any = {};
  constructor(private service: SucursalesService, public activatedRouter: ActivatedRoute, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit() {
    this.service.estados().subscribe(
      res => {
        console.log(res);
        this.estados = res
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
    this.service.paises().subscribe(
      res => {
        this.paises = res
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

    const params = this.activatedRouter.snapshot.params;
    const id:number = params['id'];
    this.service.getSucursal(id).subscribe(
      res =>{
        console.log(res);
        this.respuesta = res
        this.direccion = this.respuesta[0].direccion;
        this.sucursal.nombre = this.respuesta[0].nombre;
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

  UpdateSucursal(){
    if (!this.sucursal.nombre || !this.direccion.numero || !this.direccion.calle || !this.direccion.ciudad || !this.direccion.estado || !this.direccion.postal || !this.direccion.pais || !this.direccion.telefono) {
      alert('Por favor, llena todos los campos');
      return;
  }

  if(this.direccion.telefono < 0){
    alert('Por favor, ingresa un número de teléfono válido');
    return;
  }

  if(this.direccion.numero < 0){
    alert('Por favor, ingresa un número de dirección válido');
    return;
  }

  if(this.direccion.postal < 0){
    alert('Por favor, ingresa un código postal válido');
    return;
  }
    const params = this.activatedRouter.snapshot.params;
    const id:number = params['id'];
    console.log(this.sucursal.nombre)
    console.log(this.direccion)
    this.sucursal1.nombre = this.sucursal.nombre
    this.sucursal1.direccion = this.direccion
    console.log(this.sucursal1)
    this.service.updateSucursal(id, this.sucursal1).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Sucursal actualizada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Branch updated correctly');
          }
        this.router.navigate(['/sucursales']);
      }
      ,
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

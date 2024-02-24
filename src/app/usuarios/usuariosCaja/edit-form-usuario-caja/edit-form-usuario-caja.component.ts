import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosCajaService } from 'src/app/services/usuarios-caja.service';
import { usuarioC } from 'src/app/models/usuarioCaja';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-edit-form-usuario-caja',
  templateUrl: './edit-form-usuario-caja.component.html',
  styleUrls: ['./edit-form-usuario-caja.component.css']
})
export class EditFormUsuarioCajaComponent {
  usuario1: any = [];

  usuario:usuarioC = {
    id: 0,
    username: '',
    password: '',
    fullname: '',
    numero_caja: 0,
    sucursal_id: 0
  }
  sucursal1:any ={
    nombre: '',
    id: 0
  };
  id1:any = '';
  sucursales:any;
  sucurUsers:any;
  edit: boolean = false;
  constructor(private service: UsuariosCajaService, private router: Router, private activatedRoute: ActivatedRoute, private sucursalesS: SucursalesService, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getUsuario(id)
      .subscribe(
        res => {
          console.log(res);
          this.usuario1 = res;
          console.log(this.usuario1[0]);
          this.usuario = this.usuario1[0];
          this.id1 = this.usuario.sucursal_id;
          this.edit = true;
          this.sucursal()
        },
        err => {
              if(err.error.message === 'Token expired'){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('Your session has expired, please log in again');
                  }
                this.router.navigate(['admin']);
              }else{
                this.alertService.mostrarAlerta(err.error.text);
              }
              }
      )
    }
    this.sucursalesS.getSucursales().subscribe(
      res => {
        console.log(res)
        this.sucursales = res
        console.log(this.sucursales)
      }  
      )
  }
  updateUsuario(){
    if (!this.usuario.username || !this.usuario.fullname || !this.usuario.password || !this.usuario.numero_caja || !this.usuario.sucursal_id) {
      this.alertService.mostrarAlerta('Por favor, llena todos los campos');
      return;
  }

  if (this.usuario.numero_caja < 0) {
    this.alertService.mostrarAlerta('El número de caja no puede ser negativo');
      return;
  }  
  
    this.service.updateUsuario(this.usuario.id, this.usuario).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Usuario actualizado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('User updated correctly');
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
              }else{
                this.alertService.mostrarAlerta(err.error.text);
              }
              }
    )

   
   console.log(this.usuario);
   
  }
  sucursal(){
    if(!this.id1 ){
      console.log('selecciona algo')
    }else{
          this.sucursalesS.getSucursal(this.id1).subscribe(
      res => {
        console.log(res)
        this.sucurUsers = res;
        console.log(this.sucurUsers[0].nombre);
        this.sucursal1.nombre = this.sucurUsers[0].nombre;
        this.sucursal1.id = this.sucurUsers[0].id;
        this.usuario.sucursal_id = this.sucurUsers[0].id;
      },
      err => {
              if(err.error.message === 'Token expired'){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('Your session has expired, please log in again');
                  }
                this.router.navigate(['admin']);
              }else{
                this.alertService.mostrarAlerta(err.error.text);
              }
              }
    )
    console.log(this.usuario)
    }
  }
}

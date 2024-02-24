import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { usuarioC } from 'src/app/models/usuarioCaja';
import { AuthService } from 'src/app/services/auth-service.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuariosCajaService } from 'src/app/services/usuarios-caja.service';

@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.component.html',
  styleUrls: ['./view-usuario.component.css']
})
export class ViewUsuarioComponent {
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

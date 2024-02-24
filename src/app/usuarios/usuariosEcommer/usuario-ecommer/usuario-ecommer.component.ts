import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { UsuariosEccomerService } from 'src/app/services/usuarios-eccomer.service';

@Component({
  selector: 'app-usuario-ecommer',
  templateUrl: './usuario-ecommer.component.html',
  styleUrls: ['./usuario-ecommer.component.css']
})
export class UsuarioEcommerComponent {
  @HostBinding('class') classes = 'row'
  usuarios:any = [];
  constructor(private router: Router, private service: UsuariosEccomerService, private alertService: AlertDialogService){}
  ngOnInit(){
    this.service.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
      },
      err => {
              if(err.error.message === 'Token expired'){
                this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                this.router.navigate(['admin']);
              }
              }
    )    
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
                this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                this.router.navigate(['admin']);
              }
              }
        )    
      },
      err => {
              if(err.error.message === 'Token expired'){
                this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                this.router.navigate(['admin']);
              }
              }
    )
  }
  navigateCreate(){
    this.router.navigate(['createUsuarioEcommer'])
  }
}

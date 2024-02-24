import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioE } from 'src/app/models/usuarioEcommer';
import { UsuarioEcommerComponent } from '../usuario-ecommer/usuario-ecommer.component';
import { UsuariosEccomerService } from 'src/app/services/usuarios-eccomer.service';
import { AlertDialogService } from 'src/app/alert-dialog.service';

@Component({
  selector: 'app-create-form-usuario-ecommer',
  templateUrl: './create-form-usuario-ecommer.component.html',
  styleUrls: ['./create-form-usuario-ecommer.component.css']
})
export class CreateFormUsuarioEcommerComponent {
  usuario:usuarioE = {
    id: 0,
    username: '',
    password: '',
    fullname: ''
  }
  constructor(private router: Router, private service: UsuariosEccomerService, private alertService: AlertDialogService){}
  createNewUser(){
    delete this.usuario.id;
    this.service.saveUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/usuarioEcommer']);
      },
      err => {
              if(err.error.message === 'Token expired'){
                this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                this.router.navigate(['admin']);
              }
              }
    )
  }
}

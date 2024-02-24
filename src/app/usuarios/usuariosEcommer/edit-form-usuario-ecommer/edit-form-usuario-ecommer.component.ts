import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { usuarioE } from 'src/app/models/usuarioEcommer';
import { UsuariosEccomerService } from 'src/app/services/usuarios-eccomer.service';

@Component({
  selector: 'app-edit-form-usuario-ecommer',
  templateUrl: './edit-form-usuario-ecommer.component.html',
  styleUrls: ['./edit-form-usuario-ecommer.component.css']
})
export class EditFormUsuarioEcommerComponent {
  usuario1: any = [];

  usuario:usuarioE = {
    id: 0,
    username: '',
    password: '',
    fullname: ''
  }

  edit: boolean = false;
  constructor(private service: UsuariosEccomerService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService){}
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
          this.edit = true;
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
  updateUsuario(){    
    this.service.updateUsuario(this.usuario.id, this.usuario).subscribe(
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

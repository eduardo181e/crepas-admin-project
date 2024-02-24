import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-create-form-precio',
  templateUrl: './create-form-precio.component.html',
  styleUrls: ['./create-form-precio.component.css']
})
export class CreateFormPrecioComponent {
  precio: any= {
    precio: 0,
    descripcion: ''
  }
  constructor(private service: WaflesService, private router: Router, private alertService: AlertDialogService){}
  saveNewPrecio(){
    if(this.precio.precio > 0 && this.precio.descripcion !== ''){
    this.service.savePrecio(this.precio).subscribe(
      res =>{
        console.log(this.precio);
        console.log(res);
        this.router.navigate(['/wafflesPrecio']);
      },
      err => {
              if(err.error.message === 'Token expired'){
                this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                this.router.navigate(['admin']);
              }
              }
    )}
  }
}

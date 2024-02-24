import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

@Component({
  selector: 'app-create-form-crepa-salada-precio',
  templateUrl: './create-form-crepa-salada-precio.component.html',
  styleUrls: ['./create-form-crepa-salada-precio.component.css']
})
export class CreateFormCrepaSaladaPrecioComponent {
  precio: any= {
    precio: 0,
    descripcion: ''
  }
  constructor(private service: CrepaSaladaService, private router: Router, private alertService: AlertDialogService){}
  saveNewPrecio(){
    if(this.precio.precio > 0 && this.precio.descripcion !== ''){
      this.service.savePrecio(this.precio).subscribe(
      res =>{
        console.log(this.precio);
        console.log(res);
        this.router.navigate(['/crepaSaladaPrecio']);
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
    
}
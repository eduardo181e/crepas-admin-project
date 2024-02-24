import { Component } from '@angular/core';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
@Component({
  selector: 'app-create-form-crepa-dulce-precios',
  templateUrl: './create-form-crepa-dulce-precios.component.html',
  styleUrls: ['./create-form-crepa-dulce-precios.component.css']
})
export class CreateFormCrepaDulcePreciosComponent {
  precio: any= {
    precio: 0,
    descripcion: ''
  }
  constructor(private service: CrepaDulceService, private router: Router, private alertService: AlertDialogService){}
  saveNewPrecio(){
    if(this.precio.precio > 0 && this.precio.descripcion !== ''){
      this.service.savePrecio(this.precio).subscribe(
      res =>{
        console.log(this.precio);
        console.log(res);
        this.router.navigate(['/crepaDulcePrecio']);
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

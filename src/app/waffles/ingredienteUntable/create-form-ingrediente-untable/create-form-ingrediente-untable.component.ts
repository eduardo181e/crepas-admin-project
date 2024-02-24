import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-create-form-ingrediente-untable',
  templateUrl: './create-form-ingrediente-untable.component.html',
  styleUrls: ['./create-form-ingrediente-untable.component.css']
})
export class CreateFormIngredienteUntableComponent {
  ingrediente: any= {
    ingrediente_unt: '',
    inventario: ''
  }
  constructor(private service: WaflesService, private router: Router, private alertService: AlertDialogService, private authService: AuthService){}
  saveNewIngrediente(){
    if(this.ingrediente.ingrediente_unt == '' && this.ingrediente.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ingrediente.ingrediente_unt == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de el ingrediente');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the ingredient');
      }
    }else if(this.ingrediente.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.saveIngredienteU(this.ingrediente).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ingrediente creado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ingredient created correctly');
          }
        this.router.navigate(['/wafflesIngredienteUntable']);
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
    )}
  }
}

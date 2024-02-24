import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-ingredientes-base-create-form',
  templateUrl: './ingredientes-base-create-form.component.html',
  styleUrls: ['./ingredientes-base-create-form.component.css']
})
export class IngredientesBaseCreateFormComponent {
  ingrediente: any= {
    ingrediente_base: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewIngrediente(){
    if(this.ingrediente.ingrediente_base == '' && this.ingrediente.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ingrediente.ingrediente_base == ''){
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
    this.service.saveIngredienteB(this.ingrediente).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ingrediente creado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ingredient created correctly');
          }
        this.router.navigate(['/crepaSaladaIngredientesBase']);
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
  }}
}

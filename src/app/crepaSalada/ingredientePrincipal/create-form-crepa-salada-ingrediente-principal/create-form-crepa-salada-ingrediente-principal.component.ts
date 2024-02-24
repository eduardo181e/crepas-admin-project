import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-create-form-crepa-salada-ingrediente-principal',
  templateUrl: './create-form-crepa-salada-ingrediente-principal.component.html',
  styleUrls: ['./create-form-crepa-salada-ingrediente-principal.component.css']
})
export class CreateFormCrepaSaladaIngredientePrincipalComponent {
  ingrediente: any= {
    ingrediente_pri: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewIngrediente(){
    if(this.ingrediente.ingrediente_pri == '' && this.ingrediente.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ingrediente.ingrediente_pri == ''){
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
    this.service.saveIngredienteP(this.ingrediente).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ingrediente creado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ingredient created correctly');
          }
        this.router.navigate(['/crepaSaladaIngredientePrincipal']);
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

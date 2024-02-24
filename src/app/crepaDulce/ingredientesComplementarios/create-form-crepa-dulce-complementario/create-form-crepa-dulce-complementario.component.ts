import { Component } from '@angular/core';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-create-form-crepa-dulce-complementario',
  templateUrl: './create-form-crepa-dulce-complementario.component.html',
  styleUrls: ['./create-form-crepa-dulce-complementario.component.css']
})
export class CreateFormCrepaDulceComplementarioComponent {
  ingrediente: any= {
    ingrediente_com: '',
    tipo: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaDulceService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewIngrediente(){
    const missing = this.missinCredentials();
    if((this.ingrediente.ingrediente_com == '' && this.ingrediente.inventario == '' && this.ingrediente.tipo == '')||(missing == true)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ingrediente.ingrediente_com == '' && this.ingrediente.inventario !== '' && this.ingrediente.tipo !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de el ingrediente');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the ingredient');
      }
    }else if(this.ingrediente.inventario == '' && this.ingrediente.ingrediente_com !== '' && this.ingrediente.tipo !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else if(this.ingrediente.inventario !== '' && this.ingrediente.ingrediente_com !== '' && this.ingrediente.tipo == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor selecciona de que tipo es tu ingrediente');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please select what type your ingredient is');
      }
    } else {
    this.service.saveIngredienteC(this.ingrediente).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ingrediente guardado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ingredient saved correctly');
          }
        console.log(res);
        this.router.navigate(['/crepaDulceComplementario']);
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

     missinCredentials() {
      const arr = [];
      if(this.ingrediente.ingrediente_com == ''){
        arr.push(true)
      }else if(this.ingrediente.ingrediente_com !=='') {
        arr.push(false)
      }
      if(this.ingrediente.tipo == ''){
        arr.push(true)
      }else if(this.ingrediente.tipo !== ''){
        arr.push(false)
      }
      if(this.ingrediente.inventario == ''){
        arr.push(true)
      }else if(this.ingrediente.inventario !== ''){
        arr.push(false)
      }
    
      var cont = 0
      arr.forEach(i => {
          if(i == true){
            cont++;
          }
      })
    
      if(cont >= 2){
        return true
      }else{
        return false
      }
    }
}

import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-ingredientes-base-edit-form',
  templateUrl: './ingredientes-base-edit-form.component.html',
  styleUrls: ['./ingredientes-base-edit-form.component.css']
})
export class IngredientesBaseEditFormComponent {
  ingrediente1: any = [];

  ingrediente:any = {
    id: 0,
    ingrediente_base: ''
  }

  edit: boolean = false;
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getIngredienteB(id)
      .subscribe(
        res => {
          console.log(res);
          this.ingrediente1 = res;
          console.log(this.ingrediente1[0]);
          this.ingrediente = this.ingrediente1[0];
          this.edit = true;
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
  updateIngrediente(){
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
    this.service.updateIngredienteB(this.ingrediente.id, this.ingrediente).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ingrediente actualizado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ingredient updated correctly');
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

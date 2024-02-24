import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

@Component({
  selector: 'app-edit-form-ingredientes-untables',
  templateUrl: './edit-form-ingredientes-untables.component.html',
  styleUrls: ['./edit-form-ingredientes-untables.component.css']
})
export class EditFormIngredientesUntablesWaffleCanastaComponent {
  ingrediente1: any = [];

  ingrediente:any = {
    id: 0,
    ingrediente_unt: '',
    inventario: '',
  }

  edit: boolean = false;
  constructor(private service: WaffleCanastaService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getIngredienteU(id)
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
    if(this.ingrediente.ingrediente_unt == '' && this.ingrediente.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ingrediente.ingrediente_unt == '' && this.ingrediente.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de el ingrediente');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the ingredient');
      }
    }else if(this.ingrediente.inventario == '' && this.ingrediente.ingrediente_unt !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.updateIngredienteU(this.ingrediente.id, this.ingrediente).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ingrediente actualizado correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Ingredient updated correctly');
          }
        this.router.navigate(['/wafflesCanastaIngredienteUntable']);
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

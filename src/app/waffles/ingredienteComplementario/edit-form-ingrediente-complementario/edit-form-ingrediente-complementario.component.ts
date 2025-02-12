import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-edit-form-ingrediente-complementario',
  templateUrl: './edit-form-ingrediente-complementario.component.html',
  styleUrls: ['./edit-form-ingrediente-complementario.component.css']
})
export class EditFormIngredienteComplementarioComponent {
    ingrediente1: any = [];
  
    ingrediente:any = {
      id: 0,
      ingrediente_com: ''
    }
  
    edit: boolean = false;
    constructor(private service: WaflesService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, private authService: AuthService){}
    ngOnInit(): void {
      
  
      const params = this.activatedRoute.snapshot.params;
      const id:string = params['id']
      if(id){
        this.service.getIngredienteC(id)
        .subscribe(
          (res:any) => {
            res[0].inventario = res[0].inventario.toString();
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
      this.service.updateIngredienteC(this.ingrediente.id, this.ingrediente).subscribe(
        res => {
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('Ingrediente actualizado correctamente');
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('Ingredient updated correctly');
            }
          this.router.navigate(['/wafflesIngredienteComplementario']);
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
      )}}
    
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


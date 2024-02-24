import { Component } from '@angular/core';
import { BebidasCalientesService } from 'src/app/services/bebidas-calientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { bebida } from 'src/app/models/bebida';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-form-bebidas-calientes',
  templateUrl: './edit-form-bebidas-calientes.component.html',
  styleUrls: ['./edit-form-bebidas-calientes.component.css']
})
export class EditFormBebidasCalientesComponent {
  bebida1: any = [];

  bebida:bebida = {
    id: 0,
    bebida: '',
    descripcion: '',
    precio: 0,
    inventario: 0
  }

  edit: boolean = false;
  authService: any = {};
  constructor(private bebidasCalientesService: BebidasCalientesService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.bebidasCalientesService.getBebida(id)
      .subscribe(
        res => {
          console.log(res);
          this.bebida1 = res;
          console.log(this.bebida1[0]);
          this.bebida = this.bebida1[0];
          this.edit = true;
        },
        err => {
          if(err.error.message === 'Token expired'){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
              this.router.navigate(['admin']);
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('Your session has expired, please log in again');
                this.router.navigate(['admin']);
              }
          }
          }
      )
    }
  }
  updateBebida(){    
    const credent = this.missinCredentials();
    if((this.bebida.bebida == '' && this.bebida.descripcion == '' && this.bebida.precio == 0 && this.bebida.inventario == '')|| (credent == true)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.bebida.bebida == '' && this.bebida.descripcion !== '' && this.bebida.precio !== 0 && this.bebida.inventario !== '' ){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la bebida');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the drink');
      }
    }else if(this.bebida.descripcion == '' && this.bebida.bebida !== '' && this.bebida.precio !== 0 && this.bebida.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa una descripción');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter a description');
      }
    }else if(this.bebida.precio == 0 && this.bebida.descripcion !== '' && this.bebida.bebida !== '' && this.bebida.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un precio');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter a price');
      }
    }else if(this.bebida.inventario == '' && this.bebida.precio !== 0 && this.bebida.descripcion !== '' && this.bebida.bebida !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.bebidasCalientesService.updateBebida(this.bebida.id, this.bebida).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Bebida actualizada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Drink updated correctly');
          }
        this.router.navigate(['/bebidasCalientes']);
      },
      err => {
        if(err.error.message === 'Token expired'){
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
            this.router.navigate(['admin']);
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('Your session has expired, please log in again');
              this.router.navigate(['admin']);
            }
        }
        }
    )
    }
  }

  missinCredentials() {
    const arr = [];
    if(this.bebida.bebida == ''){
      arr.push(true)
    }else if(this.bebida.bebida !=='') {
      arr.push(false)
    }
    if(this.bebida.descripcion == ''){
      arr.push(true)
    }else if(this.bebida.descripcion !== ''){
      arr.push(false)
    }
    if(this.bebida.precio == ''){
      arr.push(true)
    }else if(this.bebida.precio !== ''){
      arr.push(false)
    }
    if(this.bebida.inventario == ''){
      arr.push(true)
    }else if(this.bebida.inventario !== ''){
      arr.push(false)
    }
  
    var cont = 0
    arr.forEach(i => {
        if(i == true){
          cont++;
        }
    })
  
    if(cont > 2){
      return true
    }else{
      return false
    }
  }
}

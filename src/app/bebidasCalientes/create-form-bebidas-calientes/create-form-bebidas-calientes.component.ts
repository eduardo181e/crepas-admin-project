import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { BebidasCalientesService } from 'src/app/services/bebidas-calientes.service';
@Component({
  selector: 'app-create-form-bebidas-calientes',
  templateUrl: './create-form-bebidas-calientes.component.html',
  styleUrls: ['./create-form-bebidas-calientes.component.css']
})
export class CreateFormBebidasCalientesComponent {
  bebida:any = {
    id: 0,
    bebida: '',
    descripcion: '',
    precio: 0,
    inventario: ''
  }
  authService: any = {};
  constructor(private router: Router, private bebidasCalientesSerivices: BebidasCalientesService, private alertService: AlertDialogService, AuthService : AuthService ){
    this.authService = AuthService;
  }
  saveNewBebida(){
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
    delete this.bebida.id;
    this.bebidasCalientesSerivices.saveBebida(this.bebida).subscribe(
      res => {
        console.log(res);
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Bebida guardada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Drink saved correctly');
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



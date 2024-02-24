import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-create-from-crepa-salada-ensalada-individual',
  templateUrl: './create-from-crepa-salada-ensalada-individual.component.html',
  styleUrls: ['./create-from-crepa-salada-ensalada-individual.component.css']
})
export class CreateFromCrepaSaladaEnsaladaIndividualComponent {
  ensalada: any= {
    ensalada_ind: '',
    descripcion: '',
    inventario: ''
  }
  authService: any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  saveNewEnsalada(){
    const credent = this.missinCredentials();
    if((this.ensalada.ensalada_ind == '' && this.ensalada.descripcion == '' && this.ensalada.inventario == '')|| (credent == true)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ensalada.ensalada_ind == '' && this.ensalada.descripcion !== '' && this.ensalada.precio !== 0 && this.ensalada.inventario !== '' ){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la ensalada');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the salad');
      }
    }else if(this.ensalada.descripcion == '' && this.ensalada.ensalada_ind !== '' && this.ensalada.precio !== 0 && this.ensalada.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa una descripción');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter a description');
      }
    }else if(this.ensalada.inventario == '' && this.ensalada.precio !== 0 && this.ensalada.descripcion !== '' && this.ensalada.ensalada_ind !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.saveEnsalada(this.ensalada).subscribe(
      res =>{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ensalada creada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Salad created correctly');
          }
        this.router.navigate(['/crepaSaladaEnsalada']);
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
    if(this.ensalada.ensalada_ind == ''){
      arr.push(true)
    }else if(this.ensalada.ensalada_ind !=='') {
      arr.push(false)
    }
    if(this.ensalada.descripcion == ''){
      arr.push(true)
    }else if(this.ensalada.descripcion !== ''){
      arr.push(false)
    }
    if(this.ensalada.inventario == ''){
      arr.push(true)
    }else if(this.ensalada.inventario !== ''){
      arr.push(false)
    }
  
    var cont = 0
    arr.forEach(i => {
        if(i == true){
          cont++;
        }
    })
  
    if(cont > 1){
      return true
    }else{
      return false
    }
  }
}

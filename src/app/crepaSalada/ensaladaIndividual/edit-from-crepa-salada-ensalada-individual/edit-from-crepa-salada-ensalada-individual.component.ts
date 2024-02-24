import { Component } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-edit-from-crepa-salada-ensalada-individual',
  templateUrl: './edit-from-crepa-salada-ensalada-individual.component.html',
  styleUrls: ['./edit-from-crepa-salada-ensalada-individual.component.css']
})
export class EditFromCrepaSaladaEnsaladaIndividualComponent {
  ensalada1:any = []
  ensalada: any= {
    ensalada_ind: '',
    descripcion: ''
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
      this.service.getEnsalada(id)
      .subscribe(
        res => {
          console.log(res);
          this.ensalada1 = res;
          console.log(this.ensalada1[0]);
          this.ensalada = this.ensalada1[0];
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
  updateEnsalada(){    
    const credent = this.missinCredentials();
    if((this.ensalada.ensalada_ind == '' && this.ensalada.descripcion == '' && this.ensalada.inventario == '')|| (credent == true)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.ensalada.ensalada_ind == '' && this.ensalada.descripcion !== '' && this.ensalada.inventario !== '' ){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la ensalada');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the salad');
      }
    }else if(this.ensalada.descripcion == '' && this.ensalada.ensalada_ind !== '' && this.ensalada.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa una descripción');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter a description');
      }
    }else if(this.ensalada.inventario == '' && this.ensalada.descripcion !== '' && this.ensalada.ensalada_ind !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.updateEnsalada(this.ensalada.id, this.ensalada).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ensalada actualizada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Salad updated correctly');
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

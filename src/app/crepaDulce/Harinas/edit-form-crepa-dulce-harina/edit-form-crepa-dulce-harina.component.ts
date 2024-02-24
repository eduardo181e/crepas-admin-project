import { Component } from '@angular/core';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-form-crepa-dulce-harina',
  templateUrl: './edit-form-crepa-dulce-harina.component.html',
  styleUrls: ['./edit-form-crepa-dulce-harina.component.css']
})
export class EditFormCrepaDulceHarinaComponent {
  harina1: any = [];

  harina:any = {
    id: 0,
    harina: '',
    inventario: ''
  }

  edit: boolean = false;
  authService: any = {};
  constructor(private service: CrepaDulceService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit(): void {
    

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    if(id){
      this.service.getHarina(id)
      .subscribe(
        res => {
          console.log(res);
          this.harina1 = res;
          console.log(this.harina1[0]);
          this.harina = this.harina1[0];
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
  updateHarina(){   
    if(this.harina.harina == '' && this.harina.inventario == ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa todos los datos');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter all the data');
      }
    }else if(this.harina.harina == '' && this.harina.inventario !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa el nombre de la harina');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter the name of the flour');
      }
    }else if(this.harina.inventario == '' && this.harina.harina !== ''){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por favor ingresa un inventario');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Please enter an inventory');
      }
    }else{
    this.service.updateHarina(this.harina.id, this.harina).subscribe(
      res => {
        console.log(res);
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Harina actualizada correctamente');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Flour updated correctly');
          }
        this.router.navigate(['/crepaDulceHarina']);
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

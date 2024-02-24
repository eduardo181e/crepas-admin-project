import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
@Component({
  selector: 'app-crepa-dulce-untable',
  templateUrl: './crepa-dulce-untable.component.html',
  styleUrls: ['./crepa-dulce-untable.component.css']
})
export class CrepaDulceUntableComponent implements OnInit {
  @HostBinding('class') classes = 'row'

  ingredientes:any = [];
  authService: any = {};
  constructor(private service:CrepaDulceService, private router:Router, private alertService: AlertDialogService, AuthService: AuthService){
      this.authService = AuthService;
  }
  ngOnInit(){
    this.service.getIngredientesU().subscribe(
      res => {
        this.ingredientes = res;
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
  deleteIngrediente(id:any){
    this.service.deleteIngredienteU(id).subscribe(
      res => {
        console.log(res);
        this.service.getIngredientesU().subscribe(
          res => {
            this.ingredientes = res;
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
  navigateCreate(){
    this.router.navigate(['createCrepaDulceUntable'])
  }
  navigateEdit(id: any){
    this.router.navigate(['editCrepaDulceUntable', id]);
  }
}

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
@Component({
  selector: 'app-crepa-dulce-complementario',
  templateUrl: './crepa-dulce-complementario.component.html',
  styleUrls: ['./crepa-dulce-complementario.component.css']
})
export class CrepaDulceComplementarioComponent implements OnInit {
  @HostBinding('class') classes = 'row'

  ingredientes:any = [];
  authService: any = {};
  constructor(private service:CrepaDulceService, private router:Router, private alertService: AlertDialogService, AuthService: AuthService){
      this.authService = AuthService;
  }
  ngOnInit(){
    this.service.getIngredientesC().subscribe(
      res => {
        console.log(res);
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
    this.service.deleteIngredienteC(id).subscribe(
      res => {
        console.log(res);
        this.service.getIngredientesC().subscribe(
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
    this.router.navigate(['createCrepaDulceComplementario'])
  }
  navigateEdit(id: any){
    this.router.navigate(['editCrepaDulceComplementario', id]);
  }
}

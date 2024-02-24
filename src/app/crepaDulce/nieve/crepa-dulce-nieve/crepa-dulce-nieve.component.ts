import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';

@Component({
  selector: 'app-crepa-dulce-nieve',
  templateUrl: './crepa-dulce-nieve.component.html',
  styleUrls: ['./crepa-dulce-nieve.component.css']
})
export class CrepaDulceNieveComponent {
  @HostBinding('class') classes = 'row'

  nieves:any = [];
  authService: any = {};
  constructor(private service:CrepaDulceService, private router:Router, private alertService: AlertDialogService, AuthService: AuthService){
      this.authService = AuthService;
  }
  ngOnInit(){
    this.service.getNieves().subscribe(
      res => {
        this.nieves = res;
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
  deleteNieve(id:any){
    this.service.deleteNieve(id).subscribe(
      res => {
        console.log(res);
        this.service.getNieves().subscribe(
          res => {
            this.nieves = res;
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
    this.router.navigate(['createCrepaDulceNieve'])
  }
  navigateEdit(id: any){
    this.router.navigate(['editCrepaDulceNieve', id]);
  }
}

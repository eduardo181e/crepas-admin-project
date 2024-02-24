import { Component, OnInit, HostBinding } from '@angular/core';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-crepa-dulce-harina',
  templateUrl: './crepa-dulce-harina.component.html',
  styleUrls: ['./crepa-dulce-harina.component.css']
})
export class CrepaDulceHarinaComponent {
 @HostBinding('class') classes = 'row'

 harinas:any = [];
 authService: any = {};
 constructor(private service:CrepaDulceService, private router:Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
 }
 ngOnInit(){
  this.service.getHarinas().subscribe(
    res => {
      this.harinas = res;
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
deleteHarina(id:any){
  this.service.deleteHarina(id).subscribe(
    res => {
      console.log(res);
      this.service.getHarinas().subscribe(
        res => {
          this.harinas = res;
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
  this.router.navigate(['createCrepaDulceHarina'])
}
navigateEdit(id: any){
  this.router.navigate(['editCrepaDulceHarina/'+ id]);
}
}

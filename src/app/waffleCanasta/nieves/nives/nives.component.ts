import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

@Component({
  selector: 'app-nives',
  templateUrl: './nives.component.html',
  styleUrls: ['./nives.component.css']
})
export class NivesWaffleCanastaComponent {
  @HostBinding('class') classes = 'row'

  nieves:any = [];
  constructor(private service:WaffleCanastaService, private router:Router, private alertService: AlertDialogService, private authService: AuthService){}
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
    this.router.navigate(['createWafflesCanastaNieve'])
  }
  navigateEdit(id: any){
    this.router.navigate(['editWafflesCanastaNieve', id]);
  }
}

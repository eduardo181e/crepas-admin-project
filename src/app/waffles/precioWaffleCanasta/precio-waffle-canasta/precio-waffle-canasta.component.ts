import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-precio-waffle-canasta',
  templateUrl: './precio-waffle-canasta.component.html',
  styleUrls: ['./precio-waffle-canasta.component.css']
})
export class PrecioWaffleCanastaComponent {
  @HostBinding('class') classes = 'row'

  precios:any = [];
  constructor(private service:WaflesService, private router:Router, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(){
    this.service.getPrecios1().subscribe(
      res => {
        this.precios = res;
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
  deletePrecio(id:any){
    this.service.deletePrecio1(id).subscribe(
      res => {
        console.log(res);
        this.service.getPrecios1().subscribe(
          res => {
            this.precios = res;
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
    this.router.navigate(['createWafflesCanastaPrecio'])
  }
  navigateEdit(id: any){
    this.router.navigate(['editWafflesCanastaPrecio', id]);
  }
}
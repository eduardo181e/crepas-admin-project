import { Component,  OnInit, HostBinding } from '@angular/core';
import { BebidasFriasService } from 'src/app/services/bebidas.frias.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-bebidas-frias',
  templateUrl: './bebidas-frias.component.html',
  styleUrls: ['./bebidas-frias.component.css']
})
export class BebidasFriasComponent implements OnInit{
  @HostBinding('class') classes = 'row'

  bebidas:any = [];
  authService: any = {}
  constructor(private bebidasFriasService:BebidasFriasService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
    ngOnInit(){
      this.bebidasFriasService.getBebidas().subscribe(
        res => {
          this.bebidas = res;
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
    deleteBebida(id:any){
      this.bebidasFriasService.deleteBebida(id).subscribe(
        res => {
          console.log(res);
          this.bebidasFriasService.getBebidas().subscribe(
            res => {
              this.bebidas = res;
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
    navigateCreate(){
      this.router.navigate(['createBebidasFrias'])
    }

    navigateEdit(id:any){
      this.router.navigate(['editBebidasFrias/'+ id])
    }

  
}

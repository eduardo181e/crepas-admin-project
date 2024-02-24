import { Component, OnInit, HostBinding } from '@angular/core';
import { BebidasCalientesService } from 'src/app/services/bebidas-calientes.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-bebidas-calientes',
  templateUrl: './bebidas-calientes.component.html',
  styleUrls: ['./bebidas-calientes.component.css']
})
export class BebidasCalientesComponent implements OnInit {
  @HostBinding('class') classes = 'row'
  bebidas:any = [];
  authService: any = {};
  constructor(private router: Router, private bebidasCalientesService: BebidasCalientesService, private alertService: AlertDialogService, private AuthService: AuthService){
    this.authService = this.AuthService
  }
  ngOnInit(){
    this.bebidasCalientesService.getBebidas().subscribe(
      res => {
        this.bebidas = res;
      },
      err => {
        if(err.error.message === 'Token expired'){
          this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
          this.router.navigate(['admin']);
        }
        }
    )    
  }
  deleteBebida(id:any){
    this.bebidasCalientesService.deleteBebida(id).subscribe(
      res => {
        console.log(res);
        this.bebidasCalientesService.getBebidas().subscribe(
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
      },err => {
        if(err.error.message === 'Token expired'){
          this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
          this.router.navigate(['admin']);
        }
        }
    )
  }
  navigateCreate(){
    this.router.navigate(['createBebidasCalientes'])
  }

  navigateEdit(id:any){
    this.router.navigate(['editBebidasCalientes/'+ id])
  }
}

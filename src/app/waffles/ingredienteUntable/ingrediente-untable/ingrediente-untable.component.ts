import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-ingrediente-untable',
  templateUrl: './ingrediente-untable.component.html',
  styleUrls: ['./ingrediente-untable.component.css']
})
export class IngredienteUntableComponent {
  @HostBinding('class') classes = 'row'

  ingredientes:any = [];
  constructor(private service:WaflesService, private router:Router, private alertService: AlertDialogService, private authService: AuthService){}
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
    this.router.navigate(['createWafflesIngredienteUntable'])
  }
  navigateEdit(id: any){
    this.router.navigate(['editWafflesIngredienteUntable', id]);
  }

}

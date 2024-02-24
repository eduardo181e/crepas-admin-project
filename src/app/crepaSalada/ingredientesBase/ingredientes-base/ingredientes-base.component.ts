import { Component, HostBinding } from '@angular/core';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-ingredientes-base',
  templateUrl: './ingredientes-base.component.html',
  styleUrls: ['./ingredientes-base.component.css']
})
export class IngredientesBaseComponent {
  @HostBinding('class') classes = 'row'

  ingredientes:any = [];
  authService: any = {};
  constructor(private service:CrepaSaladaService, private router:Router, private alertService: AlertDialogService, AuthService: AuthService){
    this.authService = AuthService;
  }
  ngOnInit(){
   this.service.getIngredientesB().subscribe(
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
   this.service.deleteIngredienteB(id).subscribe(
     res => {
       console.log(res);
       this.service.getIngredientesB().subscribe(
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
   this.router.navigate(['createCrepaSaladaIngredientesBase'])
 }
 navigateEdit(id: any){
   this.router.navigate(['editCrepaSaladaIngredientesBase', id]);
 }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';

@Component({
  selector: 'app-crepa-salada-botana-stock',
  templateUrl: './crepa-salada-botana-stock.component.html',
  styleUrls: ['./crepa-salada-botana-stock.component.css']
})
export class CrepaSaladaBotanaStockComponent {
  botanas:any;
  sucursal_id:any = this.idService.getId();
  botana1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
  constructor(private botanaService: CrepaSaladaStockService, private idService: IdService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService) {
    this.authService = AuthService;
  }
  ngOnInit(): void {
    this.botanaService.getBotanas(this.botana1).subscribe((data:any) => {
      this.botanas = data;
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
      })
  }

  actualizarExistencia(botana:any, id:any){
    if(typeof(botana.existencia) == 'string'){
      const botana1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: botana.existencia,
        cantidad: botana.cantidad
      };

      this.botanaService.updateStockBotana(id, botana1).subscribe(
        res => {
          this.botanaService.getBotanas(this.botana1).subscribe(
            res => {
            this.botanas = res;},
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
      );
    }

  }
  actualizaInventario(botana:any, id:any){

    const botana1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: botana.existencia,
      cantidad: botana.cantidad,
      inventario: botana.inventario
    };

    this.botanaService.updateStockBotana(id, botana1).subscribe(
      res => {
        this.botanaService.getBotanas(this.botana1).subscribe(
          res => {
          console.log(res)
          this.botanas = res;},
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
    );
  
}

existencia(botana: any) {

  const index = this.botanas.findIndex((e: any) => e.id === botana.id);
  if(botana.inventario == null){
    this.botanas[index].inventario = 0;
  }

  if(this.botanas[index].inventario > 0){
    this.botanas[index].existencia = 1
  }else if(this.botanas[index].inventario <= 0){
    this.botanas[index].existencia = 0
  }
  console.log(botana);
  console.log(botana.inventario);
}

facturas1(){
  if(this.botanas.length === 0){
    return false;
   }else{
  return true;
  }
}
}

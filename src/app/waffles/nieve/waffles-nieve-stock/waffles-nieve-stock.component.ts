import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { WafflesStockService } from 'src/app/services/stock/waffles-stock.service';

@Component({
  selector: 'app-waffles-nieve-stock',
  templateUrl: './waffles-nieve-stock.component.html',
  styleUrls: ['./waffles-nieve-stock.component.css']
})
export class WafflesNieveStockComponent {
  nieves:any;
  sucursal_id:any = this.idService.getId();
  bebida1:any = {
    sucursal_id: this.sucursal_id,
  }
  constructor(private stock: WafflesStockService, private idService: IdService, private alertService: AlertDialogService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.stock.getNieves(this.bebida1).subscribe(
      res => {console.log(res)
        this.nieves = res;
      console.log(this.sucursal_id)},
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

  actualizarExistencia(nieve:any, id:any){
    if(typeof(nieve.existencia) == 'string'){
      const nieve1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: nieve.existencia,
        cantidad: nieve.cantidad
      };


      this.stock.updateStockNieve(id, nieve1).subscribe(
        res => {
          this.stock.getNieves(this.bebida1).subscribe(
            res => {
            console.log(res)
            this.nieves = res;},
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

  actualizaInventario(nieve:any, id:any){
    const nieve1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: nieve.existencia,
      cantidad: nieve.cantidad,
      inventario: nieve.inventario
    };

    function esDecimal(numero:any) {

      return !Number.isInteger(numero);
    }

    if(esDecimal(nieve1.inventario)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se admiten numeros decimales')
        this.router.navigate(['admin']);
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Decimal numbers are not allowed')
        }
    }else{


    this.stock.updateStockNieve(id, nieve1).subscribe(
      res => {
        this.stock.getNieves(this.bebida1).subscribe(
          res => {
          console.log(res)
          this.nieves = res;},
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

  existencia(nieve: any) {

    const index = this.nieves.findIndex((e: any) => e.id === nieve.id);
    if(nieve.inventario == null){
      this.nieves[index].inventario = 0;
    }

    if(this.nieves[index].inventario > 0){
      this.nieves[index].existencia = 1
    }else if(this.nieves[index].inventario <= 0){
      this.nieves[index].existencia = 0
    }
    console.log(nieve);
    console.log(nieve.inventario);
  }

  facturas1(){
    if(this.nieves.length === 0){
      return false;
    }else{
      return true;
    }
  }
}

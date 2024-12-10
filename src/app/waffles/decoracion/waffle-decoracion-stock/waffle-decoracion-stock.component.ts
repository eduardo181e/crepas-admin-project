import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { WafflesStockService } from 'src/app/services/stock/waffles-stock.service';
import { WaflesService } from 'src/app/services/wafles.service';

@Component({
  selector: 'app-waffle-decoracion-stock',
  templateUrl: './waffle-decoracion-stock.component.html',
  styleUrls: ['./waffle-decoracion-stock.component.css']
})
export class WaffleDecoracionesStockComponent {
  decoraciones:any;
  sucursal_id:any = this.idService.getId();
  bebida1:any = {
    sucursal_id: this.sucursal_id,
  }
  constructor(private stock: WafflesStockService, private idService: IdService, private router: Router, private alertService: AlertDialogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.stock.getDecoraciones(this.bebida1).subscribe(
      res => {console.log(res)
        this.decoraciones = res;
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

  actualizarExistencia(decoracion:any, id:any){
    if(typeof(decoracion.existencia) == 'string'){
      const decoracion1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: decoracion.existencia,
        cantidad: decoracion.cantidad
      };

      this.stock.updateStockDecoracion(id, decoracion1).subscribe(
        res => {
          this.stock.getDecoraciones(this.bebida1).subscribe(
            res => {
            console.log(res)
            this.decoraciones = res;},
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

  actualizaInventario(decoracion:any, id:any){
    const decoracion1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: decoracion.existencia,
      cantidad: decoracion.cantidad,
      inventario: decoracion.inventario
    };
    function esDecimal(numero:any) {

      return !Number.isInteger(numero);
    }

    if(esDecimal(decoracion1.inventario)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se admiten numeros decimales')
        this.router.navigate(['admin']);
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Decimal numbers are not allowed')
        }
    }else{

    this.stock.updateStockDecoracion(id, decoracion1).subscribe(
      res => {
        this.stock.getDecoraciones(this.bebida1).subscribe(
          res => {
          console.log(res)
          this.decoraciones = res;},
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

  existencia(decoracion: any) {

    const index = this.decoraciones.findIndex((e: any) => e.id === decoracion.id);
    if(decoracion.inventario == null){
      this.decoraciones[index].inventario = 0;
    }

    if(this.decoraciones[index].inventario > 0){
      this.decoraciones[index].existencia = 1
    }else if(this.decoraciones[index].inventario <= 0){
      this.decoraciones[index].existencia = 0
    }
    console.log(decoracion);
    console.log(decoracion.inventario);
  }

  facturas1(){
    if(this.decoraciones.length === 0){
      return false;
    }else{
      return true;
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';

@Component({
  selector: 'app-crepa-salada-adereso-base-stock',
  templateUrl: './crepa-salada-adereso-base-stock.component.html',
  styleUrls: ['./crepa-salada-adereso-base-stock.component.css']
})
export class CrepaSaladaAderesoBaseStockComponent {
  aderesos:any;
  sucursal_id:any = this.idService.getId();
  bebida1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
  constructor(private stock: CrepaSaladaStockService, private idService: IdService, private alertService: AlertDialogService, private router: Router, AuthService: AuthService) {
    this.authService = AuthService;
  }

  ngOnInit(): void {
    this.stock.getAderezosBase(this.bebida1).subscribe(
      res => {console.log(res)
        this.aderesos = res;
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

  actualizarExistencia(adereso:any, id:any){
    if(typeof(adereso.existencia) == 'string'){
      const adereso1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: adereso.existencia,
        cantidad: adereso.cantidad
      };

      this.stock.updateStockAderezoBase(id, adereso1).subscribe(
        res => {
          this.stock.getAderezosBase(this.bebida1).subscribe(
            res => {
            console.log(res)
            this.aderesos = res;},
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

  actualizaInventario(adereso:any, id:any){
    const adereso1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: adereso.existencia,
      cantidad: adereso.cantidad,
      inventario: adereso.inventario
    };

    function esDecimal(numero:any) {

      return !Number.isInteger(numero);
    }
    
    if(esDecimal(adereso1.inventario)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se admiten numeros decimales')
        this.router.navigate(['admin']);
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Decimal numbers are not allowed')
        }
    }else{

    this.stock.updateStockAderezoBase(id, adereso1).subscribe(
      res => {
        this.stock.getAderezosBase(this.bebida1).subscribe(
          res => {
          console.log(res)
          this.aderesos = res;},
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

  existencia(adereso: any) {

    const index = this.aderesos.findIndex((e: any) => e.id === adereso.id);
    if(adereso.inventario == null){
      this.aderesos[index].inventario = 0;
    }

    if(this.aderesos[index].inventario > 0){
      this.aderesos[index].existencia = 1
    }else if(this.aderesos[index].inventario <= 0){
      this.aderesos[index].existencia = 0
    }
    console.log(adereso);
    console.log(adereso.inventario);
  }

  facturas1(){
    if(this.aderesos.length === 0){
      return false;
     }else{
    return true;
    }
  }
}

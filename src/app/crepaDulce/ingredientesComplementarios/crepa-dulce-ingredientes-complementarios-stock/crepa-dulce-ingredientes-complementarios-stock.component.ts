import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { CrepaDulceStockService } from 'src/app/services/stock/crepa-dulce-stock.service';

@Component({
  selector: 'app-crepa-dulce-ingredientes-complementarios-stock',
  templateUrl: './crepa-dulce-ingredientes-complementarios-stock.component.html',
  styleUrls: ['./crepa-dulce-ingredientes-complementarios-stock.component.css']
})
export class CrepaDulceIngredientesComplementariosStockComponent {
  ingredientes:any;
  sucursal_id:any = this.idService.getId();
  ingrediente1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
    constructor(private stock: CrepaDulceStockService, private idService: IdService, private alertService: AlertDialogService, private router: Router, AuthService: AuthService) {
      this.authService = AuthService;
    }
  
    ngOnInit(): void {
      this.stock.getIngredientesComplementarios(this.ingrediente1).subscribe(
        res => {console.log(res)
          this.ingredientes = res;
          console.log('problem',res)
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

    actualizarExistencia(ingrediente:any, id:any){
      if(typeof(ingrediente.existencia) == 'string'){
        const ingrediente1:any = {
          sucursal_id: parseInt(this.sucursal_id),
          existencia: ingrediente.existencia,
          cantidad: ingrediente.cantidad
        };
  
        this.stock.updateStockIngredienteComplementario(id, ingrediente1).subscribe(
          res => {
            this.stock.getIngredientesComplementarios(this.ingrediente1).subscribe(
              res => {
              console.log(res)
              this.ingredientes = res;},
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
    actualizaInventario(ingrediente:any, id:any){
      const ingrediente1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: ingrediente.existencia,
        cantidad: ingrediente.cantidad,
        inventario: ingrediente.inventario
      };

      function esDecimal(numero:any) {

        return !Number.isInteger(numero);
      }
      
      if(esDecimal(ingrediente1.inventario)){
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('No se admiten numeros decimales')
          this.router.navigate(['admin']);
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Decimal numbers are not allowed')
          }
      }else{

      this.stock.updateStockIngredienteComplementario(id, ingrediente1).subscribe(
        res => {
          this.stock.getIngredientesComplementarios(this.ingrediente1).subscribe(
            res => {
            console.log(res)
            this.ingredientes = res;},
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

    existencia(ingrediente: any) {

      const index = this.ingredientes.findIndex((e: any) => e.id === ingrediente.id);
      if(ingrediente.inventario == null){
        this.ingredientes[index].inventario = 0;
      }
  
      if(this.ingredientes[index].inventario > 0){
        this.ingredientes[index].existencia = 1
      }else if(this.ingredientes[index].inventario <= 0){
        this.ingredientes[index].existencia = 0
      }
      console.log(ingrediente);
      console.log(ingrediente.inventario);
    }

    facturas1(){
      if(this.ingredientes.length === 0){
        return false;
       }else{
      return true;
      }
    }
}

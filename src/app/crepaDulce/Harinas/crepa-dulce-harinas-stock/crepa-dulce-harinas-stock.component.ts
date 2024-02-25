import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { CrepaDulceStockService } from 'src/app/services/stock/crepa-dulce-stock.service';

@Component({
  selector: 'app-crepa-dulce-harinas-stock',
  templateUrl: './crepa-dulce-harinas-stock.component.html',
  styleUrls: ['./crepa-dulce-harinas-stock.component.css']
})
export class CrepaDulceHarinasStockComponent {
  harinas:any;
  sucursal_id:any = this.idService.getId();
  bebida1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
  constructor(private stock: CrepaDulceStockService, private idService: IdService, private router: Router,private alertService: AlertDialogService, AuthService: AuthService) { 
    this.authService = AuthService;
  }

  ngOnInit(): void {
    this.stock.getHarinas(this.bebida1).subscribe(
      res => {console.log(res)
        this.harinas = res;
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

  actualizarExistencia(harina:any, id:any){
      const harina1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: harina.existencia,
        cantidad: harina.cantidad
      };

      this.stock.updateStockHarina(id, harina1).subscribe(
        res => {
          this.stock.getHarinas(this.bebida1).subscribe(
            res => {
            console.log(res)
            this.harinas = res;},
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

  actualizaInventario(harina:any, id:any){
    const harina1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: harina.existencia,
      cantidad: harina.cantidad,
      inventario: harina.inventario
    };

    function esDecimal(numero:any) {

      return !Number.isInteger(numero);
    }
    
    if(esDecimal(harina1.inventario)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se admiten numeros decimales')
        this.router.navigate(['admin']);
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Decimal numbers are not allowed')
        }
    }else{

    this.stock.updateStockHarina(id, harina1).subscribe(
      res => {
        this.stock.getHarinas(this.bebida1).subscribe(
          res => {
          console.log(res)
          this.harinas = res;},
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
  existencia(harina: any) {

    const index = this.harinas.findIndex((e: any) => e.id === harina.id);
    if(harina.inventario == null){
      this.harinas[index].inventario = 0;
    }

    if(this.harinas[index].inventario > 0){
      this.harinas[index].existencia = 1
    }else if(this.harinas[index].inventario <= 0){
      this.harinas[index].existencia = 0
    }
    console.log(harina);
    console.log(harina.inventario);
  }

  facturas1(){
    if(this.harinas.length === 0){
      return false;
     }else{
    return true;
    }
  }
}

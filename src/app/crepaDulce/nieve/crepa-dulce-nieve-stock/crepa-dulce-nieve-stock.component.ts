import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { CrepaDulceStockService } from 'src/app/services/stock/crepa-dulce-stock.service';

@Component({
  selector: 'app-crepa-dulce-nieve-stock',
  templateUrl: './crepa-dulce-nieve-stock.component.html',
  styleUrls: ['./crepa-dulce-nieve-stock.component.css']
})
export class CrepaDulceNieveStockComponent {
  nieves:any;
  sucursal_id:any = this.idService.getId();
  bebida1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
  constructor(private stock: CrepaDulceStockService, private idService: IdService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService) {
    this.authService = AuthService;
  }

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

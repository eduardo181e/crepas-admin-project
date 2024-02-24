import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { BebidasFriasStockService } from 'src/app/services/stock/bebidas-frias-stock.service';

@Component({
  selector: 'app-bebidas-frias-stock',
  templateUrl: './bebidas-frias-stock.component.html',
  styleUrls: ['./bebidas-frias-stock.component.css']
})
export class BebidasFriasStockComponent {
  bebidas:any;
  sucursal_id:any = this.idService.getId();
  bebida1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
  constructor(private stock: BebidasFriasStockService, private idService: IdService, private alertService: AlertDialogService, private router: Router, AuthService: AuthService) {
    this.authService = AuthService;
   }
  ngOnInit(): void {
    this.stock.getBebidasFrias(this.bebida1).subscribe(
      res => {console.log(res)
        this.bebidas = res;
      console.log(this.sucursal_id)},
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
  }

  actualizarExistencia(bebida:any, id:any){
    if(typeof(bebida.existencia) == 'string'){
      const bebida1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: bebida.existencia,
        cantidad: bebida.cantidad
      };

      this.stock.updateStockBebidaFria(id, bebida1).subscribe(
        res => {
          this.stock.getBebidasFrias(this.bebida1).subscribe(
            res => {
            console.log(res)
            this.bebidas = res;},
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
      );
    }

  }

  actualizaInventario(bebida:any, id:any){

    const bebida1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: bebida.existencia,
      cantidad: bebida.cantidad,
      inventario: bebida.inventario
    };

    this.stock.updateStockBebidaFria(id, bebida1).subscribe(
      res => {
        this.stock.getBebidasFrias(this.bebida1).subscribe(
          res => {
          console.log(res)
          this.bebidas = res;},
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
    );
  
}

  existencia(bebida: any) {

    const index = this.bebidas.findIndex((e: any) => e.id === bebida.id);
    if(bebida.inventario == null){
      this.bebidas[index].inventario = 0;
    }

    if(this.bebidas[index].inventario > 0){
      this.bebidas[index].existencia = 1
    }else if(this.bebidas[index].inventario <= 0){
      this.bebidas[index].existencia = 0
    }
    console.log(bebida);
    console.log(bebida.inventario);
  }

  facturas1(){
    if(this.bebidas.length === 0){
      return false;
     }else{
    return true;
    }
  }
}

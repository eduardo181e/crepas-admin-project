import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IdService } from 'src/app/services/id.service';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';

@Component({
  selector: 'app-crepa-salada-ensalada-individual-stock',
  templateUrl: './crepa-salada-ensalada-individual-stock.component.html',
  styleUrls: ['./crepa-salada-ensalada-individual-stock.component.css']
})
export class CrepaSaladaEnsaladaIndividualStockComponent {
  ensaladas:any;
  sucursal_id:any = this.idService.getId();
  ensalada1:any = {
    sucursal_id: this.sucursal_id,
  }
  authService: any = {};
  constructor(private stock: CrepaSaladaStockService, private idService: IdService, private router: Router, private alertService: AlertDialogService, AuthService: AuthService) {
    this.authService = AuthService;
  }
  ngOnInit(): void {
    this.stock.getEnsaladasIndividuales(this.ensalada1).subscribe((data:any) => {
      this.ensaladas = data;
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
      });
  }

  actualizarExistencia(ensalada:any, id:any){
    if(typeof(ensalada.existencia) == 'string'){
      const ensalada1:any = {
        sucursal_id: parseInt(this.sucursal_id),
        existencia: ensalada.existencia,
        cantidad: ensalada.cantidad
      };

      this.stock.updateStockEnsaladaIndividual(id, ensalada1).subscribe(
        res => {
          this.stock.getEnsaladasIndividuales(this.ensalada1).subscribe(
            res => {
            this.ensaladas = res;},
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
  actualizaInventario(ensalada:any, id:any){

    const ensalada1:any = {
      sucursal_id: parseInt(this.sucursal_id),
      existencia: ensalada.existencia,
      cantidad: ensalada.cantidad,
      inventario: ensalada.inventario
    };

    function esDecimal(numero:any) {

      return !Number.isInteger(numero);
    }
    
    if(esDecimal(ensalada1.inventario)){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se admiten numeros decimales')
        this.router.navigate(['admin']);
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Decimal numbers are not allowed')
        }
    }else{

    this.stock.updateStockEnsaladaIndividual(id, ensalada1).subscribe(
      res => {
        this.stock.getEnsaladasIndividuales(this.ensalada1).subscribe(
          res => {
          console.log(res)
          this.ensaladas = res;},
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

existencia(ensalada: any) {

  const index = this.ensaladas.findIndex((e: any) => e.id === ensalada.id);
  if(ensalada.inventario == null){
    this.ensaladas[index].inventario = 0;
  }

  if(this.ensaladas[index].inventario > 0){
    this.ensaladas[index].existencia = 1
  }else if(this.ensaladas[index].inventario <= 0){
    this.ensaladas[index].existencia = 0
  }
  console.log(ensalada);
  console.log(ensalada.inventario);
}

facturas1(){
  if(this.ensaladas.length === 0){
    return false;
   }else{
  return true;
  }
}
}

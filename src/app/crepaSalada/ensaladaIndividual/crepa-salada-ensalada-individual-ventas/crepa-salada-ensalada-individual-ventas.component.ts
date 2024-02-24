import { Component } from '@angular/core';
import { CrepaSaladaSalesService } from 'src/app/services/sales/crepa-salada-sales.service';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { IdService } from 'src/app/services/id.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-crepa-salada-ensalada-individual-ventas',
  templateUrl: './crepa-salada-ensalada-individual-ventas.component.html',
  styleUrls: ['./crepa-salada-ensalada-individual-ventas.component.css']
})
export class CrepaSaladaEnsaladaIndividualVentasComponent {
  sucursal_id:any = this.idService.getId();
  ensalada1:any = {
    sucursal_id: this.sucursal_id,
    fecha: new Date()
  }
  ensaladas: any = [];
  fecha:any = {
    fecha1: '',
    fecha2: ''
  }
  authService: any = {};
  constructor(private service: CrepaSaladaSalesService, private idService: IdService,private alert: AlertDialogService,private router: Router, private alertService: AlertDialogService, AuthService: AuthService) {
    this.authService = AuthService;
  }

  formatDate(date: Date): string {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  } 
  ngOnInit(): void {
    this.ensalada1.fecha = this.formatDate(this.ensalada1.fecha);


    this.service.getEnsaladasIndividual(this.ensalada1).subscribe(
      (res:any) => {console.log(res)
        res.forEach((element:any , index:any) => {
          const fecha = element.created_at;
          // Separa la fecha en partes
const año = fecha.substr(0, 4);
const mes = fecha.substr(5, 2);
const dia = fecha.substr(8, 2);
const hora = fecha.substr(11, 2);
const minuto = fecha.substr(14, 2);
const segundo = fecha.substr(17, 2);

// Construye la fecha legible
const fechaFormateada = `${dia}/${mes}/${año} a las ${hora}:${minuto}:${segundo}`;
res[index].created_at = fechaFormateada;
        })
        this.ensaladas = res
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

  genarar(){
    if(this.fecha.fecha1 === '' || this.fecha.fecha2 === ''){
      if(this.authService.lang() === 'es'){
        this.alert.mostrarAlerta('Selecciona las fechas');
      }else if(this.authService.lang() === 'en'){
        this.alert.mostrarAlerta('Select the dates');
      }
  }else{
    const año = this.fecha.fecha1.substr(0, 4);
    const mes = this.fecha.fecha1.substr(5, 2);
    const dia = this.fecha.fecha1.substr(8, 2);
    const fecha1 = `${año}-${mes}-${dia}`
    const año1 = this.fecha.fecha2.substr(0, 4);
    const mes1 = this.fecha.fecha2.substr(5, 2);
    const dia1 = this.fecha.fecha2.substr(8, 2);
    const fecha2 = `${año1}-${mes1}-${dia1}`
    const fecha = {
      fecha1: fecha1,
      fecha2: fecha2
    }

    this.ensalada1.fechaInicio = fecha.fecha1;
    this.ensalada1.fechaFin = fecha.fecha2;
    this.service.lapsSalesEnsaladaIndividual(this.ensalada1).subscribe(
      (res:any) => {console.log(res)
        res.forEach((element:any , index:any) => {
          const fecha = element.created_at;
          // Separa la fecha en partes
const año = fecha.substr(0, 4);
const mes = fecha.substr(5, 2);
const dia = fecha.substr(8, 2);
const hora = fecha.substr(11, 2);
const minuto = fecha.substr(14, 2);
const segundo = fecha.substr(17, 2);

// Construye la fecha legible
const fechaFormateada = `${dia}/${mes}/${año} a las ${hora}:${minuto}:${segundo}`;
res[index].created_at = fechaFormateada;
        })
        this.ensaladas = res
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



    console.log(fecha)
  }
  }

  viewFactura(id:any){
    this.router.navigate(['/viewFactura/'+ id]);
  }

  facturas1(){
    if(this.ensaladas.length === 0){
      return false;
    }else{
      return true;
    }
  }
}

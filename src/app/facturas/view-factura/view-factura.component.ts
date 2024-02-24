import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/services/factura/facturas.service';
import { crepasDulce, crepasSalada, bebidasCalientes, bebidasFrias, waffles, waffleCanasta, botanas, ensaladas } from '../../models/nameCrepas';
import * as html2canvas from 'html2canvas';
import  jsPDF from 'jspdf';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-view-factura',
  templateUrl: './view-factura.component.html',
  styleUrls: ['./view-factura.component.css']
})
export class ViewFacturaComponent {

  invoice: any 
  authService: any = {};
  constructor(private facturaS: FacturasService, private activatedRoute: ActivatedRoute, private alertService: AlertDialogService, private router: Router, AuthService: AuthService) {
    this.authService = AuthService
   
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id']
    this.facturaS.getInvoice(id).subscribe(
      res => {
        console.log(res);
        this.invoice = res;
        this.viewOrden();
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
    )
  }

  viewOrden(){
    let body = document.createElement('body');
    let body11 = document.createElement('body');
    let div = document.createElement('div');
    let div1 = document.createElement('div');

    div.classList.add('tabla-container');

const año = this.invoice[0].fecha_hora.substr(0, 4);
const mes = this.invoice[0].fecha_hora.substr(5, 2);
const dia = this.invoice[0].fecha_hora.substr(8, 2);
const hora = this.invoice[0].fecha_hora.substr(11, 2);
const minuto = this.invoice[0].fecha_hora.substr(14, 2);
const segundo = this.invoice[0].fecha_hora.substr(17, 2);

// Construye la fecha legible
this.invoice[0].fecha_hora =`${dia}/${mes}/${año} a las ${hora}:${minuto}:${segundo}`;

let info:any = `<div class="infoInv" style="position: relative; background: oldlace;"><div class="info">Fecha y hora: ${this.invoice[0].fecha_hora}</div>
<div class="info">Factura ID: ${this.invoice[0].id}</div>
<div class="info">Numero de caja: ${this.invoice[0].numero_caja}</div>
<div class="info">Numero de productos: ${this.invoice[0].numero_productos}</div>
<div class="info">Sucursal ID: ${this.invoice[0].sucursal_id}</div>
<div class="info">Total: ${this.invoice[0].total}</div>
<div class="info">User ID${this.invoice[0].userId}</div></div>
`
div.innerHTML += info;
div1.innerHTML += info;
const token:any = localStorage.getItem('token');
const tokenData = token.split('.')[1]; // Obtén la parte de los datos del token
const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
console.log(tokenData)
// Accede a los datos del usuario
const userData = {

  lang: decodedTokenData.lang,
  // Agrega otros datos del usuario si los necesitas
};     
const language = userData.lang;
if(language === 'es'){
    this.invoice[0].orden.forEach((objeto:any) => {
      console.log(objeto.nombre);
      let tabla = '';
      let tabla1 = '';
      switch (objeto.nombre) {

        case crepasDulce:
      tabla = `
  <div>
  <table class="table1">
    <thead>
      <tr>
        <th class="border-cell1 dulce12">Nombre</th>
        <th class="border-cell1 dulce12">Cantidad</th>
        <th class="border-cell1 dulce12">Precio</th>
        <th class="border-cell1 dulce12">Complementos</th>
        <th class="border-cell1 dulce12">Untables</th>
        <th class="border-cell1 dulce12">Harina</th>
        <th class="border-cell1 dulce12">Nieve</th>
        <th class="border-cell1 dulce12">Decoracion</th>
        <th class="border-cell1 dulce12">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border-cell1 dulce1">${objeto.nombre}</td>
        <td class="border-cell1 dulce1">${objeto.cantidad}</td>
        <td class="border-cell1 dulce1">${objeto.precio}</td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">${objeto.orden.harina.harina}</td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
          ${objeto.orden.decoracion.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
        </ul>
      </td>
        <td class="border-cell1 dulce1">${objeto.total}</td>
      </tr>
    </tbody>
  </table>
  </div>
`;

div.innerHTML += tabla;
tabla1 = `
<div class="ContRes1">
<div class="dulceRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">
        ${objeto.cantidad}
        </div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Complementos</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Untables</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Harina</div>
<div class="padd1">
${objeto.orden.harina.harina}
</div>
</div>
<div class="Col1">
<div class="dulce12">Nieve</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Decoracion</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`;

div1.innerHTML += tabla1;

break;
case crepasSalada:
  tabla = `
  <div>
  <table class="table1">
    <thead>
      <tr>
        <th class="border-cell1 dulce12">Nombre</th>
        <th class="border-cell1 dulce12">Cantidad</th>
        <th class="border-cell1 dulce12">Precio</th>
        <th class="border-cell1 dulce12">Ingredientes Base</th>
        <th class="border-cell1 dulce12">Adereso Base</th>
        <th class="border-cell1 dulce12">Ingredientes</th>
        <th class="border-cell1 dulce12">Aderesos</th>
        <th class="border-cell1 dulce12">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border-cell1 dulce1">${objeto.nombre}</td>
        <td class="border-cell1 dulce1">${objeto.cantidad}</td>
        <td class="border-cell1 dulce1">${objeto.precio}</td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
          ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
          ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
        <td class="border-cell1 dulce1">${objeto.total}</td>
      </tr>
    </tbody>
  </table>
  </div>
  `
  div.innerHTML += tabla;
  tabla1 = `
<div class="ContRes1">
<div class="dulceRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">
        ${objeto.cantidad}
        </div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Ingredientes Base</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Adereso Base</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Ingredientes</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Aderesos</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`;

div1.innerHTML += tabla1;
  break;

  case waffles:
    tabla = `
<div>
<table class="table1">
  <thead>
    <tr>
      <th class="border-cell1 dulce12">Nombre</th>
      <th class="border-cell1 dulce12">Cantidad</th>
      <th class="border-cell1 dulce12">Precio</th>
      <th class="border-cell1 dulce12">Complementos</th>
      <th class="border-cell1 dulce12">Untables</th>
      <th class="border-cell1 dulce12">Nieve</th>
      <th class="border-cell1 dulce12">Decoracion</th>
      <th class="border-cell1 dulce12">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border-cell1 dulce1">${objeto.nombre}</td>
      <td class="border-cell1 dulce1">${objeto.cantidad}</td>
      <td class="border-cell1 dulce1">${objeto.precio}</td>
      <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
          ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
          ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
          ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
        </ul>
      </td>
      <td class="border-cell1 dulce1">
      <ul class="ingredient-list1">
      ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
      </ul>
    </td>
      <td class="border-cell1 dulce1">${objeto.total}</td>
    </tr>
  </tbody>
</table>
</div>
`;

div.innerHTML += tabla;
tabla1 = `
<div class="ContRes1">
<div class="dulceRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">
        ${objeto.cantidad}
        </div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Complementos</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Untables</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Harina</div>
<div class="padd1">
${objeto.orden.harina.harina}
</div>
</div>
<div class="Col1">
<div class="dulce12">Nieve</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Decoracion</div>
<div class="padd1">
<ul class="ingredient-list1">
${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
</ul>
</div>
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`;

div1.innerHTML += tabla1;
break;

case waffleCanasta:
  tabla = `
  <div>
  <table class="table1">
    <thead>
      <tr>
        <th class="border-cell1 dulce12">Nombre</th>
        <th class="border-cell1 dulce12">Cantidad</th>
        <th class="border-cell1 dulce12">Precio</th>
        <th class="border-cell1 dulce12">Complementos</th>
        <th class="border-cell1 dulce12">Untables</th>
        <th class="border-cell1 dulce12">Nieve</th>
        <th class="border-cell1 dulce12">Decoracion</th>
        <th class="border-cell1 dulce12">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border-cell1 dulce1">${objeto.nombre}</td>
        <td class="border-cell1 dulce1">${objeto.cantidad}</td>
        <td class="border-cell1 dulce1">${objeto.precio}</td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
        ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
        </ul>
      </td>
        <td class="border-cell1 dulce1">${objeto.total}</td>
      </tr>
    </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="dulceRes1">
      <div class="Col1">
              <div class="dulce12">Nombre</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Cantidad</div>
          <div class="padd1">
          ${objeto.cantidad}
          </div>
  </div>
  <div class="Col1">
      <div class="dulce12">Precio</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Complementos</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Untables</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Harina</div>
  <div class="padd1">
  ${objeto.orden.harina.harina}
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Nieve</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Decoracion</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `;
  
  div1.innerHTML += tabla1;
break;

case bebidasCalientes:
tabla = `
<div>
<table class="table1">
<thead>
<tr>
  <th class="border-cell1 dulce12">Nombre</th>
  <th class="border-cell1 dulce12">Cantidad</th>
  <th class="border-cell1 dulce12">Precio</th>
  <th class="border-cell1 dulce12">Bebida</th>
  <th class="border-cell1 dulce12">Total</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="border-cell1 dulce1">${objeto.nombre}</td>
  <td class="border-cell1 dulce1">${objeto.cantidad}</td>
  <td class="border-cell1 dulce1">${objeto.precio}</td>
  <td class="border-cell1 dulce1">
    <ul class="ingredient-list1">
      ${objeto.orden.bebida}
    </ul>
  </td>
  <td class="border-cell1 dulce1">${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
tabla1 = `
<div class="ContRes1">
<div class="botanasRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">${objeto.cantidad}</div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Bebida</div>
<div class="padd1">${objeto.orden.bebida}</div>    
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`
div1.innerHTML += tabla1;
break;

case bebidasFrias:
tabla = `
<div>
<table class="table1">
<thead>
<tr>
  <th class="border-cell1 dulce12">Nombre</th>
  <th class="border-cell1 dulce12">Cantidad</th>
  <th class="border-cell1 dulce12">Precio</th>
  <th class="border-cell1 dulce12">Bebida</th>
  <th class="border-cell1 dulce12">Total</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="border-cell1 dulce1">${objeto.nombre}</td>
  <td class="border-cell1 dulce1">${objeto.cantidad}</td>
  <td class="border-cell1 dulce1">${objeto.precio}</td>
  <td class="border-cell1 dulce1">
    <ul class="ingredient-list1">
      ${objeto.orden.bebida}
    </ul>
  </td>
  <td class="border-cell1 dulce1">${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
tabla1 = `
<div class="ContRes1">
<div class="botanasRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">${objeto.cantidad}</div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Bebida</div>
<div class="padd1">${objeto.orden.bebida}</div>    
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`
div1.innerHTML += tabla1;
break;

case botanas:
tabla = `
<div>
<table class="table1">
<thead>
<tr>
  <th class="border-cell1 dulce12">Nombre</th>
  <th class="border-cell1 dulce12">Cantidad</th>
  <th class="border-cell1 dulce12">Precio</th>
  <th class="border-cell1 dulce12">Botana</th>
  <th class="border-cell1 dulce12">Total</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="border-cell1 dulce1">${objeto.nombre}</td>
  <td class="border-cell1 dulce1">${objeto.cantidad}</td>
  <td class="border-cell1 dulce1">${objeto.precio}</td>
  <td class="border-cell1 dulce1">
    <ul class="ingredient-list1">
      ${objeto.orden.botana}
    </ul>
  </td>
  <td class="border-cell1 dulce1">${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
tabla1 = `
<div class="ContRes1">
<div class="botanasRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">${objeto.cantidad}</div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Bebida</div>
<div class="padd1">${objeto.orden.botana}</div>    
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`
div1.innerHTML += tabla1;
break;

case ensaladas:
tabla = `
<div>
<table class="table1">
<thead>
<tr>
  <th class="border-cell1 dulce12">Nombre</th>
  <th class="border-cell1 dulce12">Cantidad</th>
  <th class="border-cell1 dulce12">Precio</th>
  <th class="border-cell1 dulce12">Ensalada</th>
  <th class="border-cell1 dulce12">Total</th>
</tr>
</thead>
<tbody>
<tr>
  <td class="border-cell1 dulce1">${objeto.nombre}</td>
  <td class="border-cell1 dulce1">${objeto.cantidad}</td>
  <td class="border-cell1 dulce1">${objeto.precio}</td>
  <td class="border-cell1 dulce1">
    <ul class="ingredient-list1">
      ${objeto.orden.ensalada}
    </ul>
  </td>
  <td class="border-cell1 dulce1">${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
tabla1 = `
<div class="ContRes1">
<div class="botanasRes1">
    <div class="Col1">
            <div class="dulce12">Nombre</div>
            <div class="padd1">${objeto.nombre}</div>
    </div>
    <div class="Col1">
        <div class="dulce12">Cantidad</div>
        <div class="padd1">${objeto.cantidad}</div>
</div>
<div class="Col1">
    <div class="dulce12">Precio</div>
    <div class="padd1">${objeto.precio}</div>    
</div>
<div class="Col1">
<div class="dulce12">Bebida</div>
<div class="padd1">${objeto.orden.ensalada}</div>    
</div>
<div class="Col1">
<div class="dulce12">Total</div>
<div class="padd1">${objeto.total}</div>    
</div>
</div>
</div>
`
div1.innerHTML += tabla1;
break;
      }
    });}else if(language === 'en'){
      this.invoice[0].orden.forEach((objeto:any) => {
        console.log(objeto.nombre);
        let tabla = '';
        let tabla1 = '';
        switch (objeto.nombre) {
  
          case crepasDulce:
        tabla = `
    <div>
    <table class="table1">
      <thead>
        <tr>
          <th class="border-cell1 dulce12">Name</th>
          <th class="border-cell1 dulce12">Amount</th>
          <th class="border-cell1 dulce12">Price</th>
          <th class="border-cell1 dulce12">Complements</th>
          <th class="border-cell1 dulce12">Spreads</th>
          <th class="border-cell1 dulce12">Flour</th>
          <th class="border-cell1 dulce12">Snow</th>
          <th class="border-cell1 dulce12">Decor</th>
          <th class="border-cell1 dulce12">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border-cell1 dulce1">${objeto.nombre}</td>
          <td class="border-cell1 dulce1">${objeto.cantidad}</td>
          <td class="border-cell1 dulce1">${objeto.precio}</td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">${objeto.orden.harina.harina}</td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.decoracion.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
          <td class="border-cell1 dulce1">${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="dulceRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">
          ${objeto.cantidad}
          </div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Complements</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Spreads</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Flour</div>
  <div class="padd1">
  ${objeto.orden.harina.harina}
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Snow</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Decor</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `;
  
  div1.innerHTML += tabla1;
  
  break;
  case crepasSalada:
    tabla = `
    <div>
    <table class="table1">
      <thead>
        <tr>
          <th class="border-cell1 dulce12">Name</th>
          <th class="border-cell1 dulce12">Amount</th>
          <th class="border-cell1 dulce12">Price</th>
          <th class="border-cell1 dulce12">Base Ingredients</th>
          <th class="border-cell1 dulce12">Base Dressings</th>
          <th class="border-cell1 dulce12">Ingredients</th>
          <th class="border-cell1 dulce12">Dressings</th>
          <th class="border-cell1 dulce12">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border-cell1 dulce1">${objeto.nombre}</td>
          <td class="border-cell1 dulce1">${objeto.cantidad}</td>
          <td class="border-cell1 dulce1">${objeto.precio}</td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
          <td class="border-cell1 dulce1">${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
    `
    div.innerHTML += tabla;
    tabla1 = `
  <div class="ContRes1">
  <div class="dulceRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">
          ${objeto.cantidad}
          </div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Base Ingredients</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Base Dressings</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Ingredients</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Dressings</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `;
  
  div1.innerHTML += tabla1;
    break;
  
    case waffles:
      tabla = `
  <div>
  <table class="table1">
    <thead>
      <tr>
        <th class="border-cell1 dulce12">Name</th>
        <th class="border-cell1 dulce12">Amount</th>
        <th class="border-cell1 dulce12">Price</th>
        <th class="border-cell1 dulce12">Complements</th>
        <th class="border-cell1 dulce12">Spreads</th>
        <th class="border-cell1 dulce12">Snow</th>
        <th class="border-cell1 dulce12">Decor</th>
        <th class="border-cell1 dulce12">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border-cell1 dulce1">${objeto.nombre}</td>
        <td class="border-cell1 dulce1">${objeto.cantidad}</td>
        <td class="border-cell1 dulce1">${objeto.precio}</td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
            ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
        <td class="border-cell1 dulce1">
        <ul class="ingredient-list1">
        ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
        </ul>
      </td>
        <td class="border-cell1 dulce1">${objeto.total}</td>
      </tr>
    </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="dulceRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">
          ${objeto.cantidad}
          </div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Complements</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Spreads</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Snow</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Decor</div>
  <div class="padd1">
  <ul class="ingredient-list1">
  ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
  </ul>
  </div>
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `;
  
  div1.innerHTML += tabla1;
  break;
  
  case waffleCanasta:
    tabla = `
    <div>
    <table class="table1">
      <thead>
        <tr>
          <th class="border-cell1 dulce12">Name</th>
          <th class="border-cell1 dulce12">Amount</th>
          <th class="border-cell1 dulce12">Price</th>
          <th class="border-cell1 dulce12">Complements</th>
          <th class="border-cell1 dulce12">Spreads</th>
          <th class="border-cell1 dulce12">Snow</th>
          <th class="border-cell1 dulce12">Decor</th>
          <th class="border-cell1 dulce12">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border-cell1 dulce1">${objeto.nombre}</td>
          <td class="border-cell1 dulce1">${objeto.cantidad}</td>
          <td class="border-cell1 dulce1">${objeto.precio}</td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
            <ul class="ingredient-list1">
              ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
            </ul>
          </td>
          <td class="border-cell1 dulce1">
          <ul class="ingredient-list1">
          ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
          </ul>
        </td>
          <td class="border-cell1 dulce1">${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
    `;
    
    div.innerHTML += tabla;
    tabla1 = `
    <div class="ContRes1">
    <div class="dulceRes1">
        <div class="Col1">
                <div class="dulce12">Name</div>
                <div class="padd1">${objeto.nombre}</div>
        </div>
        <div class="Col1">
            <div class="dulce12">Amount</div>
            <div class="padd1">
            ${objeto.cantidad}
            </div>
    </div>
    <div class="Col1">
        <div class="dulce12">Price</div>
        <div class="padd1">${objeto.precio}</div>    
    </div>
    <div class="Col1">
    <div class="dulce12">Complements</div>
    <div class="padd1">
    <ul class="ingredient-list1">
    ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
    </ul>
    </div>
    </div>
    <div class="Col1">
    <div class="dulce12">Spreads</div>
    <div class="padd1">
    <ul class="ingredient-list1">
    ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
    </ul>
    </div>
    </div>
    <div class="Col1">
    <div class="dulce12">Snow</div>
    <div class="padd1">
    <ul class="ingredient-list1">
    ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
    </ul>
    </div>
    </div>
    <div class="Col1">
    <div class="dulce12">Decor</div>
    <div class="padd1">
    <ul class="ingredient-list1">
    ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
    </ul>
    </div>
    </div>
    <div class="Col1">
    <div class="dulce12">Total</div>
    <div class="padd1">${objeto.total}</div>    
    </div>
    </div>
    </div>
    `;
    
    div1.innerHTML += tabla1;
  break;
  
  case bebidasCalientes:
  tabla = `
  <div>
  <table class="table1">
  <thead>
  <tr>
    <th class="border-cell1 dulce12">Name</th>
    <th class="border-cell1 dulce12">Amount</th>
    <th class="border-cell1 dulce12">Price</th>
    <th class="border-cell1 dulce12">Drink</th>
    <th class="border-cell1 dulce12">Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td class="border-cell1 dulce1">${objeto.nombre}</td>
    <td class="border-cell1 dulce1">${objeto.cantidad}</td>
    <td class="border-cell1 dulce1">${objeto.precio}</td>
    <td class="border-cell1 dulce1">
      <ul class="ingredient-list1">
        ${objeto.orden.bebida}
      </ul>
    </td>
    <td class="border-cell1 dulce1">${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="botanasRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">${objeto.cantidad}</div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Drink</div>
  <div class="padd1">${objeto.orden.bebida}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `
  div1.innerHTML += tabla1;
  break;
  
  case bebidasFrias:
  tabla = `
  <div>
  <table class="table1">
  <thead>
  <tr>
    <th class="border-cell1 dulce12">Name</th>
    <th class="border-cell1 dulce12">Amount</th>
    <th class="border-cell1 dulce12">Price</th>
    <th class="border-cell1 dulce12">Drink</th>
    <th class="border-cell1 dulce12">Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td class="border-cell1 dulce1">${objeto.nombre}</td>
    <td class="border-cell1 dulce1">${objeto.cantidad}</td>
    <td class="border-cell1 dulce1">${objeto.precio}</td>
    <td class="border-cell1 dulce1">
      <ul class="ingredient-list1">
        ${objeto.orden.bebida}
      </ul>
    </td>
    <td class="border-cell1 dulce1">${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="botanasRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">${objeto.cantidad}</div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Drink</div>
  <div class="padd1">${objeto.orden.bebida}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `
  div1.innerHTML += tabla1;
  break;
  
  case botanas:
  tabla = `
  <div>
  <table class="table1">
  <thead>
  <tr>
    <th class="border-cell1 dulce12">Name</th>
    <th class="border-cell1 dulce12">Amount</th>
    <th class="border-cell1 dulce12">Price</th>
    <th class="border-cell1 dulce12">Snack</th>
    <th class="border-cell1 dulce12">Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td class="border-cell1 dulce1">${objeto.nombre}</td>
    <td class="border-cell1 dulce1">${objeto.cantidad}</td>
    <td class="border-cell1 dulce1">${objeto.precio}</td>
    <td class="border-cell1 dulce1">
      <ul class="ingredient-list1">
        ${objeto.orden.botana}
      </ul>
    </td>
    <td class="border-cell1 dulce1">${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="botanasRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">${objeto.cantidad}</div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Snack</div>
  <div class="padd1">${objeto.orden.botana}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `
  div1.innerHTML += tabla1;
  break;
  
  case ensaladas:
  tabla = `
  <div>
  <table class="table1">
  <thead>
  <tr>
    <th class="border-cell1 dulce12">Name</th>
    <th class="border-cell1 dulce12">Amount</th>
    <th class="border-cell1 dulce12">Price</th>
    <th class="border-cell1 dulce12">Salad</th>
    <th class="border-cell1 dulce12">Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td class="border-cell1 dulce1">${objeto.nombre}</td>
    <td class="border-cell1 dulce1">${objeto.cantidad}</td>
    <td class="border-cell1 dulce1">${objeto.precio}</td>
    <td class="border-cell1 dulce1">
      <ul class="ingredient-list1">
        ${objeto.orden.ensalada}
      </ul>
    </td>
    <td class="border-cell1 dulce1">${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  tabla1 = `
  <div class="ContRes1">
  <div class="botanasRes1">
      <div class="Col1">
              <div class="dulce12">Name</div>
              <div class="padd1">${objeto.nombre}</div>
      </div>
      <div class="Col1">
          <div class="dulce12">Amount</div>
          <div class="padd1">${objeto.cantidad}</div>
  </div>
  <div class="Col1">
      <div class="dulce12">Price</div>
      <div class="padd1">${objeto.precio}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Salad</div>
  <div class="padd1">${objeto.orden.ensalada}</div>    
  </div>
  <div class="Col1">
  <div class="dulce12">Total</div>
  <div class="padd1">${objeto.total}</div>    
  </div>
  </div>
  </div>
  `
  div1.innerHTML += tabla1;
  break;
        }
      });
    }

    let div2 = document.createElement('div');
    let div12 = document.createElement('div');
    div2.innerHTML = div.innerHTML;
    div12.innerHTML = div1.innerHTML;

    body.innerHTML = div2.innerHTML;
    body11.innerHTML = div12.innerHTML;
    let total = document.createElement('div');
    total.innerHTML = `
  <div class="total1">
  <div class="totalCant1">total: ${this.invoice[0].total}</div>
</div>
`
    body.innerHTML += total.innerHTML;
    body11.innerHTML += total.innerHTML;


    console.log(body.innerHTML);
    let body1:any = document.getElementById('container');
    let body12:any = document.getElementById('containerRes');
    body1.innerHTML = body.innerHTML;
    body12.innerHTML = body11.innerHTML;
  }

  viewOrden1(){
    let body = document.createElement('body');
    let div = document.createElement('div');

    div.classList.add('tabla-container');
    body.innerHTML = `
<style>
.tabla-container {
  padding-bottom: 40px;
  }
  .tabla-container table {
  width: 900px;
  }
  
  .tabla-container th,
  .tabla-container td {
  
    text-align: inherit;
    width: 5%;
  }
  .tabla-container li {
    list-style: none;
  
  }
  
  ul{
    margin: 0px;
    padding: 0px;
  }
  
  .tabla-container a {
    text-decoration: none;
  }
  
  .total{
    border-radius: 10px;
    height: 50px;
    width: 870px;
  }
  
  .totalCant p{
    display: block;
    float: right;
    height: 50px;
    width: 10%;
    padding: 0px;
    padding-top: 12px;
    padding-left: 165px;
  }
  
  .one{
    width: 1000px;
  }
  
  .info{
  margin-bottom: 5px;
  }

</style>`;
const año = this.invoice[0].fecha_hora.substr(0, 4);
const mes = this.invoice[0].fecha_hora.substr(5, 2);
const dia = this.invoice[0].fecha_hora.substr(8, 2);
const hora = this.invoice[0].fecha_hora.substr(11, 2);
const minuto = this.invoice[0].fecha_hora.substr(14, 2);
const segundo = this.invoice[0].fecha_hora.substr(17, 2);

// Construye la fecha legible
this.invoice[0].fecha_hora =`${dia}/${mes}/${año} a las ${hora}:${minuto}:${segundo}`;
const token:any = localStorage.getItem('token');
const tokenData = token.split('.')[1]; // Obtén la parte de los datos del token
const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
console.log(tokenData)
// Accede a los datos del usuario
const userData = {

  lang: decodedTokenData.lang,
  // Agrega otros datos del usuario si los necesitas
};     
const language = userData.lang;

if(language === 'es'){
      
  let info:any = `<div style="position: relative; width: 855px;"><div class="info">Fecha y hora: ${this.invoice[0].fecha_hora}</div>
  <div class="info">Factura ID: ${this.invoice[0].id}</div>
  <div class="info">Numero de caja: ${this.invoice[0].numero_caja}</div>
  <div class="info">Numero de productos: ${this.invoice[0].numero_productos}</div>
  <div class="info">Sucursal ID: ${this.invoice[0].sucursal_id}</div>
  <div class="info">Total: ${this.invoice[0].total}</div>
  <div class="info">User ID: ${this.invoice[0].userId}</div></div>
  `
  div.innerHTML += info;
      this.invoice[0].orden.forEach((objeto:any) => {
        console.log(objeto.nombre);
        let tabla = '';
        switch (objeto.nombre) {
  
          case crepasDulce:
        tabla = `
    <div class='tabla-container'>
    <table style="width: 902px;">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Complementos</th>
          <th>Untables</th>
          <th>Harina</th>
          <th>Nieve</th>
          <th>Decoracion</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${objeto.nombre}</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul>
              ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>${objeto.orden.harina.harina}</td>
          <td>
            <ul>
              ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
          <ul>
          ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
          </ul>
        </td>
          <td>${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
  `;
  
  div.innerHTML += tabla;
  break;
  case crepasSalada:
    tabla = `
    <div  class='tabla-container'>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Ingredientes Base</th>
          <th>Adereso Base</th>
          <th>Ingredientes</th>
          <th>Aderesos</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${objeto.nombre}</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul>
              ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
            </ul>
          </td>
          <td>
          <ul class="ingredient-list">
            ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
          <td>${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
    `
    div.innerHTML += tabla;
    break;
  
    case waffles:
      tabla = `
  <div class='tabla-container'>
  <table style="width: 920px;">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Complementos</th>
        <th>Untables</th>
        <th>Nieve</th>
        <th>Decoracion</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
        <ul>
        ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
        </ul>
      </td>
        <td>${objeto.total}</td>
      </tr>
    </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case waffleCanasta:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 923px;">
  <thead>
  <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Complementos</th>
    <th>Untables</th>
    <th>Nieve</th>
    <th>Decoracion</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
    <ul>
    ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
    </ul>
  </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case bebidasCalientes:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1005px;">
  <thead>
  <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Bebida</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.bebida}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case bebidasFrias:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1005px;">
  <thead>
  <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Bebida</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.bebida}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case botanas:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1005px;">
  <thead>
  <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Botana</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.botana}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case ensaladas:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1000px;">
  <thead>
  <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Ensalada</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.ensalada}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
        }
      });
    }else if(language === 'en'){
            
  let info:any = `<div style="position: relative; width: 855px;"><div class="info">Fecha y hora: ${this.invoice[0].fecha_hora}</div>
  <div class="info">Factura ID: ${this.invoice[0].id}</div>
  <div class="info">Numero de caja: ${this.invoice[0].numero_caja}</div>
  <div class="info">Numero de productos: ${this.invoice[0].numero_productos}</div>
  <div class="info">Sucursal ID: ${this.invoice[0].sucursal_id}</div>
  <div class="info">Total: ${this.invoice[0].total}</div>
  <div class="info">User ID: ${this.invoice[0].userId}</div></div>
  `
  div.innerHTML += info;
      this.invoice[0].orden.forEach((objeto:any) => {
        console.log(objeto.nombre);
        let tabla = '';
        switch (objeto.nombre) {
  
          case crepasDulce:
        tabla = `
    <div class='tabla-container'>
    <table style="width: 902px;">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Complements</th>
          <th>Spreads</th>
          <th>Flour</th>
          <th>Snow</th>
          <th>Decor</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${objeto.nombre}</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul>
              ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>${objeto.orden.harina.harina}</td>
          <td>
            <ul>
              ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
          <ul>
          ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
          </ul>
        </td>
          <td>${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
  `;
  
  div.innerHTML += tabla;
  break;
  case crepasSalada:
    tabla = `
    <div  class='tabla-container'>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Base Ingredients</th>
          <th>Base Dressings</th>
          <th>Ingredients</th>
          <th>Dressings</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${objeto.nombre}</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul>
              ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
            </ul>
          </td>
          <td>
          <ul class="ingredient-list">
            ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
          <td>${objeto.total}</td>
        </tr>
      </tbody>
    </table>
    </div>
    `
    div.innerHTML += tabla;
    break;
  
    case waffles:
      tabla = `
  <div class='tabla-container'>
  <table style="width: 920px;">
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Complements</th>
        <th>Spreads</th>
        <th>Snow</th>
        <th>Decor</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
        <ul>
        ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
        </ul>
      </td>
        <td>${objeto.total}</td>
      </tr>
    </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case waffleCanasta:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 923px;">
  <thead>
  <tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Price</th>
    <th>Complements</th>
    <th>Spreads</th>
    <th>Snow</th>
    <th>Decor</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
    <ul>
    ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
    </ul>
  </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case bebidasCalientes:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1005px;">
  <thead>
  <tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Price</th>
    <th>Drink</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.bebida}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case bebidasFrias:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1005px;">
  <thead>
  <tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Price</th>
    <th>Drink</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.bebida}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case botanas:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1005px;">
  <thead>
  <tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Price</th>
    <th>Snack</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.botana}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
  
  case ensaladas:
  tabla = `
  <div class='tabla-container'>
  <table style="width: 1000px;">
  <thead>
  <tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Price</th>
    <th>Salad</th>
    <th>Total</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.ensalada}
      </ul>
    </td>
    <td>${objeto.total}</td>
  </tr>
  </tbody>
  </table>
  </div>
  `;
  
  div.innerHTML += tabla;
  break;
        }
      });
    }

    let div2 = document.createElement('div');
    div2.innerHTML = div.innerHTML;
    div2.style.width = '100%';

    body.appendChild(div2);
    let total = document.createElement('div');
    total.innerHTML = `
   <div class="total">
      <div class="totalCant"><p>total: ${this.invoice[0].total}</p></div>
  </div>
`
    body.innerHTML += total.innerHTML;

    const doc = new jsPDF('p', 'pt', 'letter');
    doc.html(body, {
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.68,

      },
      callback: function (doc) {
        doc.save("carrito.pdf");
      }
    });
    console.log(body.innerHTML);
  }
}

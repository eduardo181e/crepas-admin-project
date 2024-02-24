import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  constructor(private router: Router){}
  navigateProductos(){
    this.router.navigate(['menu']);
  }
  navigateUsuarios(){
    this.router.navigate(['usuarioCaja']);
  }
  navigateSucursales(){
    this.router.navigate(['sucursales']);
  }
  navigateFacturas(){
    this.router.navigate(['facturas']);
  }

  navigateVentas(){
    this.router.navigate(['salesGlobal']);
  }
}

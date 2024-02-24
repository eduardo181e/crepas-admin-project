import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sucursal-menu',
  templateUrl: './admin-sucursal-menu.component.html',
  styleUrls: ['./admin-sucursal-menu.component.css']
})
export class AdminSucursalMenuComponent {

  constructor(private router: Router) { }
  navigateStock(){
    this.router.navigate(['stock'])
  }

  navigateVentas(){
    this.router.navigate(['sales'])
  }

  navigateFacturas(){
    this.router.navigate(['facturaSucursal'])
  }
}

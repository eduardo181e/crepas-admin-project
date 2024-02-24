import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bebidas-sales',
  templateUrl: './menu-bebidas-sales.component.html',
  styleUrls: ['./menu-bebidas-sales.component.css']
})
export class MenuBebidasSalesComponent {
  constructor(private router: Router){}
  navigateBebidasFrias(){
    this.router.navigate(['/bebidasFriasSales'])
  }
  navigateBebidasCalientes(){
    this.router.navigate(['/bebidasCalientesSales']) 
  }
}

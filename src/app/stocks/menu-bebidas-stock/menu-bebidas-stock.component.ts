import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bebidas-stock',
  templateUrl: './menu-bebidas-stock.component.html',
  styleUrls: ['./menu-bebidas-stock.component.css']
})
export class MenuBebidasStockComponent {
  constructor(private router: Router){}
  navigateBebidasFrias(){
    this.router.navigate(['/bebidasFriasStock'])
  }
  navigateBebidasCalientes(){
    this.router.navigate(['/bebidasCalientesStock']) 
  }
}

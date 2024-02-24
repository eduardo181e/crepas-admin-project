import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-regular-sales',
  templateUrl: './menu-waffle-regular-sales.component.html',
  styleUrls: ['./menu-waffle-regular-sales.component.css']
})
export class MenuWaffleRegularSalesComponent {
  constructor(private router:Router){}
  navigateUntables(){
    this.router.navigate(['wafflesIngredienteUntableSales']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesIngredienteComplementarioSales']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesNieveSales']);
  }
}

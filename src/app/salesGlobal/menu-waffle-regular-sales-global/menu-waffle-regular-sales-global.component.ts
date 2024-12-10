import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-regular-sales-global',
  templateUrl: './menu-waffle-regular-sales-global.component.html',
  styleUrls: ['./menu-waffle-regular-sales-global.component.css']
})
export class MenuWaffleRegularSalesGlobalComponent {
  constructor(private router:Router){}
  navigateUntables(){
    this.router.navigate(['wafflesIngredienteUntableSalesGlobal']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesIngredienteComplementarioSalesGlobal']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesNieveSalesGlobal']);
  }
  navigateDecoracion(){
    this.router.navigate(['wafflesDecoracionSalesGlobal']);
  }
}

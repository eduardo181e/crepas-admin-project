import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffles-canasta-sales',
  templateUrl: './menu-waffles-canasta-sales.component.html',
  styleUrls: ['./menu-waffles-canasta-sales.component.css']
})
export class MenuWafflesCanastaSalesGlobalComponent {
  constructor(private router: Router){}
  navigateUntables(){
    this.router.navigate(['wafflesCanastaIngredienteUntableSalesGlobal']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesCanastaIngredienteComplementarioSalesGlobal']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesCanastaNieveSalesGlobal']);
  }
}

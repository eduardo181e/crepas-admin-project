import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-canasta-stock',
  templateUrl: './menu-waffle-canasta-stock.component.html',
  styleUrls: ['./menu-waffle-canasta-stock.component.css']
})
export class MenuWaffleCanastaStockComponent {
  constructor(private router: Router){}
  navigateUntables(){
    this.router.navigate(['wafflesCanastaIngredienteUntableStock']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesCanastaIngredienteComplementarioStock']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesCanastaNieveStock']);
  }
}

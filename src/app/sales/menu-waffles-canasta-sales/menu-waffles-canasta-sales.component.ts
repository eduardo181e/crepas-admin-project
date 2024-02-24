import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffles-canasta-sales',
  templateUrl: './menu-waffles-canasta-sales.component.html',
  styleUrls: ['./menu-waffles-canasta-sales.component.css']
})
export class MenuWafflesCanastaSalesComponent {
  constructor(private router: Router){}
  navigateUntables(){
    this.router.navigate(['wafflesCanastaIngredienteUntableSales']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesCanastaIngredienteComplementarioSales']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesCanastaNieveSales']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-regular',
  templateUrl: './menu-waffle-regular.component.html',
  styleUrls: ['./menu-waffle-regular.component.css']
})
export class MenuWaffleStockRegularComponent {
  constructor(private router:Router){}
  navigateUntables(){
    this.router.navigate(['wafflesIngredienteUntableStock']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesIngredienteComplementarioStock']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesNieveStock']);
  }
}

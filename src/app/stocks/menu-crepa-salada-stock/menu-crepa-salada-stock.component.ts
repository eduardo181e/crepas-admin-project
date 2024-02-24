import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-salada-stock',
  templateUrl: './menu-crepa-salada-stock.component.html',
  styleUrls: ['./menu-crepa-salada-stock.component.css']
})
export class MenuCrepaSaladaStockComponent {
  constructor(private router:Router){}
  navigateAdereso(){
    this.router.navigate(['crepaSaladaAderesoStock']);  
  }
  navigateIngredientePrincipal(){
    this.router.navigate(['crepaSaladaIngredientePrincipalStock']);
  }
  navigateEnsaladas(){
    this.router.navigate(['crepaSaladaEnsaladaStock']);
  }
  navigateBotana(){
    this.router.navigate(['crepaSaladaBotanaStock']);
  }
  navigateIngredientesBase(){
    this.router.navigate(['crepaSaladaIngredientesBaseStock']);
  }
  navigateAderesosBase(){
    this.router.navigate(['crepaSaladaAderesosBaseStock']);
  }
}

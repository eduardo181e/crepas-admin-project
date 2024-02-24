import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-salada-sales',
  templateUrl: './menu-crepa-salada-sales.component.html',
  styleUrls: ['./menu-crepa-salada-sales.component.css']
})
export class MenuCrepaSaladaSalesComponent {
  constructor(private router:Router){}
  navigateAdereso(){
    this.router.navigate(['crepaSaladaAderesoSales']);  
  }
  navigateIngredientePrincipal(){
    this.router.navigate(['crepaSaladaIngredientePrincipalSales']);
  }
  navigateEnsaladas(){
    this.router.navigate(['crepaSaladaEnsaladaSales']);
  }
  navigateBotana(){
    this.router.navigate(['crepaSaladaBotanaSales']);
  }
  navigateIngredientesBase(){
    this.router.navigate(['crepaSaladaIngredientesBaseSales']);
  }
  navigateAderesosBase(){
    this.router.navigate(['crepaSaladaAderesosBaseSales']);
  }
}

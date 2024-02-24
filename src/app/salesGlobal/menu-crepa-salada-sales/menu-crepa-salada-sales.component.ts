import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-salada-sales',
  templateUrl: './menu-crepa-salada-sales.component.html',
  styleUrls: ['./menu-crepa-salada-sales.component.css']
})
export class MenuCrepaSaladaSalesGlobalComponent {
  constructor(private router:Router){}
  navigateAdereso(){
    this.router.navigate(['crepaSaladaAderesoSalesGlobal']);  
  }
  navigateIngredientePrincipal(){
    this.router.navigate(['crepaSaladaIngredientePrincipalSalesGlobal']);
  }
  navigateEnsaladas(){
    this.router.navigate(['crepaSaladaEnsaladaSalesGlobal']);
  }
  navigateBotana(){
    this.router.navigate(['crepaSaladaBotanaSalesGlobal']);
  }
  navigateIngredientesBase(){
    this.router.navigate(['crepaSaladaIngredientesBaseSalesGlobal']);
  }
  navigateAderesosBase(){
    this.router.navigate(['crepaSaladaAderesosBaseSalesGlobal']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-crepa-salada',
  templateUrl: './menu-crepa-salada.component.html',
  styleUrls: ['./menu-crepa-salada.component.css']
})
export class MenuCrepaSaladaComponent {
  constructor(private router:Router){}
  navigateAdereso(){
    this.router.navigate(['crepaSaladaAdereso']);  
  }
  navigateIngredientePrincipal(){
    this.router.navigate(['crepaSaladaIngredientePrincipal']);
  }
  navigateEnsaladas(){
    this.router.navigate(['crepaSaladaEnsalada']);
  }
  navigateBotana(){
    this.router.navigate(['crepaSaladaBotana']);
  }
  navigatePrecio(){
    this.router.navigate(['crepaSaladaPrecio']);
  }
  navigateIngredientesBase(){
    this.router.navigate(['crepaSaladaIngredientesBase']);
  }
  navigateAderesosBase(){
    this.router.navigate(['crepaSaladaAderesosBase']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-canasta',
  templateUrl: './menu-waffle-canasta.component.html',
  styleUrls: ['./menu-waffle-canasta.component.css']
})
export class MenuWaffleCanastaComponent {

  constructor(private router:Router) { }
  navigateUntables(){
    this.router.navigate(['wafflesCanastaIngredienteUntable']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesCanastaIngredienteComplementario']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesCanastaNieve']);
  }
  navigatePrecios(){
    this.router.navigate(['wafflesCanastaPrecio']);
  }
  navigateDecoracion(){
    this.router.navigate(['wafflesCanastaDecoracion']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-regular',
  templateUrl: './menu-waffle-regular.component.html',
  styleUrls: ['./menu-waffle-regular.component.css']
})
export class MenuWaffleRegularComponent {
  constructor(private router: Router){}
  navigateUntables(){
    this.router.navigate(['wafflesIngredienteUntable']);
  }
  navigateComplementarios(){
    this.router.navigate(['wafflesIngredienteComplementario']);
  }
  navigateNieves(){
    this.router.navigate(['wafflesNieve']);
  }
  navigatePrecios(){
    this.router.navigate(['wafflesPrecio']);
  }
}

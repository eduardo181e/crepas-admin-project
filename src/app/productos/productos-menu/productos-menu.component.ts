import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-menu',
  templateUrl: './productos-menu.component.html',
  styleUrls: ['./productos-menu.component.css']
})
export class ProductosMenuComponent {
  constructor(private router: Router){}

  navigateBebidas(){
    this.router.navigate(['bebidas']);
  }
  navigateCrepas(){
    this.router.navigate(['menuCrepas']);
  }
  navigateWafles(){
    this.router.navigate(['menuWafles']);
  }
  navigateEnsaladaInd(){
    this.router.navigate(['crepaSaladaEnsalada']);
  }

  navigateBotana(){
    this.router.navigate(['crepaSaladaBotana']);
  }
}

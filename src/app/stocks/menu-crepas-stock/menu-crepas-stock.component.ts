import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepas-stock',
  templateUrl: './menu-crepas-stock.component.html',
  styleUrls: ['./menu-crepas-stock.component.css']
})
export class MenuCrepasStockComponent {
  constructor(private router: Router){}
  navigateCrepaDulce(){
    this.router.navigate(['menuCrepaDulceStock']);
  }
  navigateCrepaSalada(){
    this.router.navigate(['menuCrepaSaladaStock']);
  }
}

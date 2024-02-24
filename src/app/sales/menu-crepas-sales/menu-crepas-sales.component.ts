import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepas-sales',
  templateUrl: './menu-crepas-sales.component.html',
  styleUrls: ['./menu-crepas-sales.component.css']
})
export class MenuCrepasSalesComponent {
  constructor(private router: Router){}
  navigateCrepaDulce(){
    this.router.navigate(['menuCrepaDulceSales']);
  }
  navigateCrepaSalada(){
    this.router.navigate(['menuCrepaSaladaSales']);
  }
}

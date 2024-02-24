import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffle-stock',
  templateUrl: './menu-waffle-stock.component.html',
  styleUrls: ['./menu-waffle-stock.component.css']
})
export class MenuWaffleStockComponent {
  constructor(private router:Router){}
  navigateWaffles(){
    this.router.navigate(['menuWaffleRegularStock']);
  }
  navigateCanasta(){
    this.router.navigate(['menuWaffleCanastaStock']);
  }
}

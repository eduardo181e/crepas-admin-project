import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-waffles-sales',
  templateUrl: './menu-waffles-sales.component.html',
  styleUrls: ['./menu-waffles-sales.component.css']
})
export class MenuWafflesSalesGlobalComponent {
  constructor(private router:Router){}
  navigateWaffles(){
    this.router.navigate(['menuWaffleRegularSalesGlobal']);
  }
  navigateCanasta(){
    this.router.navigate(['menuWaffleCanastaSalesGlobal']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-wafles',
  templateUrl: './menu-wafles.component.html',
  styleUrls: ['./menu-wafles.component.css']
})
export class MenuWaflesComponent {
  constructor(private router: Router){}
  navigateWaffles(){
    this.router.navigate(['menuWaffleRegular']);
  }
  navigateCanasta(){
    this.router.navigate(['menuWaffleCanasta']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bebidas',
  templateUrl: './menu-bebidas.component.html',
  styleUrls: ['./menu-bebidas.component.css']
})
export class MenuBebidasComponent {
  constructor(private router: Router){}
  navigateBebidasFrias(){
    this.router.navigate(['/bebidasFrias'])
  }
  navigateBebidasCalientes(){
    this.router.navigate(['/bebidasCalientes']) 
  }
}

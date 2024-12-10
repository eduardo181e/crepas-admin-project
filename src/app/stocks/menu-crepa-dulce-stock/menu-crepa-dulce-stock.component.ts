import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-dulce-stock',
  templateUrl: './menu-crepa-dulce-stock.component.html',
  styleUrls: ['./menu-crepa-dulce-stock.component.css']
})
export class MenuCrepaDulceStockComponent {
  constructor(public router: Router){}
  navigateHarinas(){
   this.router.navigate(['crepaDulceHarinaStock'])
  }
  navigateComplementarios(){
   this.router.navigate(['crepaDulceComplementarioStock']); 
  }
  navigateUntables(){
   this.router.navigate(['crepaDulceUntableStock']); 
  }
  navigateNieve(){
   this.router.navigate(['crepaDulceNieveStock']);
  }
  navigateDecoracion(){
    this.router.navigate(['crepaDulceDecoracionStock']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-dulce-sales',
  templateUrl: './menu-crepa-dulce-sales.component.html',
  styleUrls: ['./menu-crepa-dulce-sales.component.css']
})
export class MenuCrepaDulceSalesComponent {
  constructor(public router: Router){}
  navigateHarinas(){
   this.router.navigate(['crepaDulceHarinaSales'])
  }
  navigateComplementarios(){
   this.router.navigate(['crepaDulceComplementarioSales']); 
  }
  navigateUntables(){
   this.router.navigate(['crepaDulceUntableSales']); 
  }
  navigateNieve(){
   this.router.navigate(['crepaDulceNieveSales']);
  }

  navigateDecoracion(){
    this.router.navigate(['crepaDulceDecoracionSales']);
  }
}

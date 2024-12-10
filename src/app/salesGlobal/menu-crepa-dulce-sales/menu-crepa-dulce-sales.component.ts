import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-dulce-sales',
  templateUrl: './menu-crepa-dulce-sales.component.html',
  styleUrls: ['./menu-crepa-dulce-sales.component.css']
})
export class MenuCrepaDulceSalesGlobalComponent {
  constructor(public router: Router){}
  navigateHarinas(){
   this.router.navigate(['crepaDulceHarinaSalesGlobal'])
  }
  navigateComplementarios(){
   this.router.navigate(['crepaDulceComplementarioSalesGlobal']); 
  }
  navigateUntables(){
   this.router.navigate(['crepaDulceUntableSalesGlobal']); 
  }
  navigateNieve(){
   this.router.navigate(['crepaDulceNieveSalesGlobal']);
  }
  navigateDecoracion(){
    this.router.navigate(['crepaDulceDecoracionSalesGlobal']);
  }
}

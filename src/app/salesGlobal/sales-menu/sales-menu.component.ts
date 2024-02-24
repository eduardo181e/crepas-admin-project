import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdService } from 'src/app/services/id.service';

@Component({
  selector: 'app-sales-menu',
  templateUrl: './sales-menu.component.html',
  styleUrls: ['./sales-menu.component.css']
})
export class SalesGlobalMenuComponent {
  id:any = this.idService.getId();
  constructor(private router: Router, private idService: IdService) { }
  ngOnInit(): void {
    console.log(this.id);
  }
  navigateBebidas(){
    this.router.navigate(['menuBebidasSalesGlobal']);
  }
  navigateCrepas(){
    this.router.navigate(['menuCrepasSalesGlobal']);
  }
  navigateWafles(){
    this.router.navigate(['menuWaffleSalesGlobal']);
  }
  navigateEnsaladaInd(){
    this.router.navigate(['crepaSaladaEnsaladaSalesGlobal']);
  }

  navigateBotana(){
    this.router.navigate(['crepaSaladaBotanaSalesGlobal']);
  }
}

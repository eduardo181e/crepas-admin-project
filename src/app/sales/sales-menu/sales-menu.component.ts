import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdService } from 'src/app/services/id.service';

@Component({
  selector: 'app-sales-menu',
  templateUrl: './sales-menu.component.html',
  styleUrls: ['./sales-menu.component.css']
})
export class SalesMenuComponent {
  id:any = this.idService.getId();
  constructor(private router: Router, private idService: IdService) { }
  ngOnInit(): void {
    console.log(this.id);
  }
  navigateBebidas(){
    this.router.navigate(['menuBebidasSales']);
  }
  navigateCrepas(){
    this.router.navigate(['menuCrepasSales']);
  }
  navigateWafles(){
    this.router.navigate(['menuWaffleSales']);
  }
  navigateEnsaladaInd(){
    this.router.navigate(['crepaSaladaEnsaladaSales']);
  }

  navigateBotana(){
    this.router.navigate(['crepaSaladaBotanaSales']);
  }
}

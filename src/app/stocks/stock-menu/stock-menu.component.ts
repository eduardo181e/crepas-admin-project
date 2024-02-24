import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdService } from 'src/app/services/id.service';

@Component({
  selector: 'app-stock-menu',
  templateUrl: './stock-menu.component.html',
  styleUrls: ['./stock-menu.component.css']
})
export class StockMenuComponent {
  id:any = this.idService.getId();
  constructor(private router: Router, private idService: IdService) { }
  ngOnInit(): void {
    console.log(this.id);
  }
  navigateBebidas(){
    this.router.navigate(['menuBebidasStock']);
  }
  navigateCrepas(){
    this.router.navigate(['menuCrepasStock']);
  }
  navigateWafles(){
    this.router.navigate(['menuWaffleStock']);
  }
  navigateEnsaladaInd(){
    this.router.navigate(['crepaSaladaEnsaladaStock']);
  }

  navigateBotana(){
    this.router.navigate(['crepaSaladaBotanaStock']);
  }
}

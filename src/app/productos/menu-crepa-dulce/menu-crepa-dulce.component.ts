import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepa-dulce',
  templateUrl: './menu-crepa-dulce.component.html',
  styleUrls: ['./menu-crepa-dulce.component.css']
})
export class MenuCrepaDulceComponent {
 constructor(public router: Router){}
 navigateHarinas(){
  this.router.navigate(['crepaDulceHarina'])
 }
 navigateComplementarios(){
  this.router.navigate(['crepaDulceComplementario']); 
 }
 navigateUntables(){
  this.router.navigate(['crepaDulceUntable']); 
 }
 navigateNieve(){
  this.router.navigate(['/crepaDulceNieve']);
 }
 navigatePrecio(){
  this.router.navigate(['crepaDulcePrecio']);
 }
}

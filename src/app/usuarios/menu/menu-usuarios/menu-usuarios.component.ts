import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuarios',
  templateUrl: './menu-usuarios.component.html',
  styleUrls: ['./menu-usuarios.component.css']
})
export class MenuUsuariosComponent {
  constructor(public router:Router){}
  navigateCaja(){
    this.router.navigate(['usuarioCaja'])
  }
  navigateEcommer(){
    this.router.navigate(['usuarioEcommer'])
  }
}

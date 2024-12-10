import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

@Component({
  selector: 'app-decoracion',
  templateUrl: './decoracion.component.html',
  styleUrls: ['./decoracion.component.css']
})
export class DecoracionesWaffleCanastaComponent {
  @HostBinding('class') classes = 'row'

  decoraciones:any = [];
  constructor(private service:WaffleCanastaService, private router:Router, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(){
    this.service.getDecoraciones().subscribe(
      res => {
        this.decoraciones = res;
      },
      err => {
              if(err.error.message === 'Token expired'){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('Your session has expired, please log in again');
                  }
                this.router.navigate(['admin']);
              }
              }
    )    
  }
  navigateEdit(id: any){
    this.router.navigate(['editWafflesCanastaDecoracion', id]);
  }
}

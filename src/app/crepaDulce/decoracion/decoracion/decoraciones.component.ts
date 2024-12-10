import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';

@Component({
  selector: 'app-nives',
  templateUrl: './decoraciones.component.html',
  styleUrls: ['./decoraciones.component.css']
})
export class DecoracionesCrepaDulceComponent {
  @HostBinding('class') classes = 'row'

  decoraciones:any = [];
  constructor(private service:CrepaDulceService, private router:Router, private alertService: AlertDialogService, private authService: AuthService){}
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
    this.router.navigate(['editCrepaDulceDecoracion', id]);
  }
}

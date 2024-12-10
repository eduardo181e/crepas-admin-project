import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoracionesWaffleCanastaComponent } from './decoracion.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

describe('DecoracionesWaffleCanastaComponent', () => {
  let component: DecoracionesWaffleCanastaComponent;
  let fixture: ComponentFixture<DecoracionesWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let waffleCanastaService: jasmine.SpyObj<WaffleCanastaService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockdecoracion = [{ decoracion: 'Vainilla',inventario: '1', id: '2'},{ decoracion: 'Fresa', inventario: '2', id: '4'} ];
  let ingredinetesMock = {
    getDecoraciones: jasmine.createSpy('getDecoraciones').and.returnValue(of(mockdecoracion)),
    deleteDecoracion: jasmine.createSpy('deleteDecoracion').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    waffleCanastaService = jasmine.createSpyObj('WaffleCanastaService', ['getDecoraciones', 'deleteDecoracion']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ DecoracionesWaffleCanastaComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaffleCanastaService, useValue: ingredinetesMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecoracionesWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ingredinetesMock.getDecoraciones.and.returnValue(of(mockdecoracion))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.decoraciones).toEqual(mockdecoracion)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    ingredinetesMock.getDecoraciones.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.getDecoraciones.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editWafflesCanastaDecoracion', 2]);
  });
});

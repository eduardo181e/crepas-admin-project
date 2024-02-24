import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioWaffleCanastaComponent } from './precio-waffle-canasta.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

describe('PrecioWaffleCanastaComponent', () => {
  let component: PrecioWaffleCanastaComponent;
  let fixture: ComponentFixture<PrecioWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let waflesService: jasmine.SpyObj<WaflesService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockprecios = [{ precio: 'Vainilla',descripcion: '1', id: '2'},{ precio: 'Fresa', descripcion: '2', id: '4'} ];
  let ingredinetesMock = {
    getPrecios1: jasmine.createSpy('getPrecios1').and.returnValue(of(mockprecios)),
    deletePrecio1: jasmine.createSpy('deletePrecio1').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    waflesService = jasmine.createSpyObj('WaflesService', ['getPrecios1', 'deletePrecio1']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ PrecioWaffleCanastaComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaflesService, useValue: ingredinetesMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecioWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ingredinetesMock.getPrecios1.and.returnValue(of(mockprecios))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.precios).toEqual(mockprecios)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    ingredinetesMock.getPrecios1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.getPrecios1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
   expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    
  });


  it('should return an object without the object with the id that was deleted', async () => {
    component.precios = mockprecios
    ingredinetesMock.deletePrecio1.and.returnValue(of())
    const remIndex = mockprecios.findIndex(i => i.id === '4')
    mockprecios.splice(remIndex)
    ingredinetesMock.getPrecios1.and.returnValue(of(mockprecios))
    const mockBebidasRem = [{ precio: 'Vainilla',descripcion: '1', id: '2' }];
    component.deletePrecio(4)
    await fixture.whenStable();
    
      expect(component.precios).toEqual(mockBebidasRem)
    
    
  });

  it('should return an object without the object with the id that was deleted (error token expired)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deletePrecio1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.deletePrecio(4)
    await fixture.whenStable();
    
   expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
 
  });

  it('should return an object without the object with the id that was deleted (error token expired, in return new snows)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deletePrecio1.and.returnValue(of())
    ingredinetesMock.getPrecios1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    const remIndex = mockprecios.findIndex(i => i.id === '4')
    mockprecios.splice(remIndex)
    
    const mockBebidasRem = [{ precio: 'Vainilla',descripcion: '1', id: '2' }];
    component.deletePrecio(4)
    await fixture.whenStable();
    setTimeout(() => {      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);}, 400)

  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createWafflesCanastaPrecio']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editWafflesCanastaPrecio', 2]);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulcePreciosComponent } from './crepa-dulce-precios.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

describe('CrepaDulceprecioComplementarioComponent', () => {
  let component: CrepaDulcePreciosComponent;
  let fixture: ComponentFixture<CrepaDulcePreciosComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaDulceService: jasmine.SpyObj<CrepaDulceService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockprecios = [{ precio: 'Vainilla',descripcion: '1', id: '2'},{ precio: 'Fresa', descripcion: '2', id: '4'} ];
  let ingredinetesMock = {
    getPrecios: jasmine.createSpy('getPrecios').and.returnValue(of(mockprecios)),
    deletePrecio: jasmine.createSpy('deletePrecio').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaDulceService = jasmine.createSpyObj('CrepaDulceService', ['getPrecios', 'deletePrecio']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ CrepaDulcePreciosComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceService, useValue: ingredinetesMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulcePreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ingredinetesMock.getPrecios.and.returnValue(of(mockprecios))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.precios).toEqual(mockprecios)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    ingredinetesMock.getPrecios.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.getPrecios.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
   expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    
  });


  it('should return an object without the object with the id that was deleted', async () => {
    component.precios = mockprecios
    ingredinetesMock.deletePrecio.and.returnValue(of())
    const remIndex = mockprecios.findIndex(i => i.id === '4')
    mockprecios.splice(remIndex)
    ingredinetesMock.getPrecios.and.returnValue(of(mockprecios))
    const mockBebidasRem = [{ precio: 'Vainilla',descripcion: '1', id: '2' }];
    component.deletePrecio(4)
    await fixture.whenStable();
    
      expect(component.precios).toEqual(mockBebidasRem)
    
    
  });

  it('should return an object without the object with the id that was deleted (error token expired)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deletePrecio.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.deletePrecio(4)
    await fixture.whenStable();
    
   expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
 
  });

  it('should return an object without the object with the id that was deleted (error token expired, in return new snows)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deletePrecio.and.returnValue(of())
    ingredinetesMock.getPrecios.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    const remIndex = mockprecios.findIndex(i => i.id === '4')
    mockprecios.splice(remIndex)
    
    const mockBebidasRem = [{ precio: 'Vainilla',descripcion: '1', id: '2' }];
    component.deletePrecio(4)
    await fixture.whenStable();
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createCrepaDulcePrecio']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editCrepaDulcePrecio', 2]);
  });
});

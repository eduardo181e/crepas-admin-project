import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceNieveComponent } from './crepa-dulce-nieve.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

describe('CrepaDulceNieveComponent', () => {
  let component: CrepaDulceNieveComponent;
  let fixture: ComponentFixture<CrepaDulceNieveComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaDulceService: jasmine.SpyObj<CrepaDulceService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockNieve = [{ nieve: 'Vainilla',inventario: '1', id: '2'},{ nieve: 'Fresa', inventario: '2', id: '4'} ];
  let ingredinetesMock = {
    getNieves: jasmine.createSpy('getNieves').and.returnValue(of(mockNieve)),
    deleteNieve: jasmine.createSpy('deleteNieve').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaDulceService = jasmine.createSpyObj('CrepaDulceService', ['getNieves', 'deleteNieve']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ CrepaDulceNieveComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceService, useValue: ingredinetesMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceNieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ingredinetesMock.getNieves.and.returnValue(of(mockNieve))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.nieves).toEqual(mockNieve)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    ingredinetesMock.getNieves.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.getNieves.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });


  it('should return an object without the object with the id that was deleted', async () => {
    component.nieves = mockNieve
    ingredinetesMock.deleteNieve.and.returnValue(of())
    const remIndex = mockNieve.findIndex(i => i.id === '4')
    mockNieve.splice(remIndex)
    ingredinetesMock.getNieves.and.returnValue(of(mockNieve))
    const mockBebidasRem = [{ nieve: 'Vainilla',inventario: '1', id: '2' }];
    component.deleteNieve(4)
    await fixture.whenStable();
    setTimeout(() =>{
      expect(component.nieves).toEqual(mockBebidasRem)
    }, 400)
    
  });

  it('should return an object without the object with the id that was deleted (error token expired)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deleteNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.deleteNieve(4)
    await fixture.whenStable();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should return an object without the object with the id that was deleted (error token expired, in return new snows)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deleteNieve.and.returnValue(of())
    ingredinetesMock.getNieves.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    const remIndex = mockNieve.findIndex(i => i.id === '4')
    mockNieve.splice(remIndex)
    
    const mockBebidasRem = [{ nieve: 'Vainilla',inventario: '1', id: '2' }];
    component.deleteNieve(4)
    await fixture.whenStable();
    setTimeout(()=> {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  
    }, 200)
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createCrepaDulceNieve']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editCrepaDulceNieve', 2]);
  });
});

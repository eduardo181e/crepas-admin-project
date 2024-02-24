import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaIngredientePrincipalComponent } from './crepa-salada-ingrediente-principal.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('CrepaSaladaIngredientePrincipalComponent', () => {
  let component: CrepaSaladaIngredientePrincipalComponent;
  let fixture: ComponentFixture<CrepaSaladaIngredientePrincipalComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaSaladaService: jasmine.SpyObj<CrepaSaladaService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockIngredientes = [{ ingrediente_pri: 'Vainilla',inventario: '1', id: '2'},{ ingrediente_pri: 'Fresa', inventario: '2', id: '4'} ];
  let ingredinetesMock = {
    getIngredientesP: jasmine.createSpy('getIngredientesP').and.returnValue(of(mockIngredientes)),
    deleteIngredienteP: jasmine.createSpy('deleteIngredienteP').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaService = jasmine.createSpyObj('CrepaSaladaService', ['getIngredientesP', 'deleteIngredienteP']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ CrepaSaladaIngredientePrincipalComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: ingredinetesMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaIngredientePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ingredinetesMock.getIngredientesP.and.returnValue(of(mockIngredientes))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.ingredientes).toEqual(mockIngredientes)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    ingredinetesMock.getIngredientesP.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.getIngredientesP.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });


  it('should return an object without the object with the id that was deleted', async () => {
    component.ingredientes = mockIngredientes
    ingredinetesMock.deleteIngredienteP.and.returnValue(of())
    const remIndex = mockIngredientes.findIndex(i => i.id === '4')
    mockIngredientes.splice(remIndex)
    ingredinetesMock.getIngredientesP.and.returnValue(of(mockIngredientes))
    const mockBebidasRem = [{ harina: 'Vainilla',inventario: '1', id: '2' }];
    component.deleteIngrediente(4)
    await fixture.whenStable();
    setTimeout(() =>{
      expect(component.ingredientes).toEqual(mockBebidasRem)
    }, 400)
    
  });

  it('should return an object without the object with the id that was deleted (error token expired)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deleteIngredienteP.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.deleteIngrediente(4)
    await fixture.whenStable();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should return an object without the object with the id that was deleted (error token expired, in return new snows)', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ingredinetesMock.deleteIngredienteP.and.returnValue(of())
    ingredinetesMock.getIngredientesP.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    const remIndex = mockIngredientes.findIndex(i => i.id === '4')
    mockIngredientes.splice(remIndex)
    
    const mockBebidasRem = [{ harina: 'Vainilla',inventario: '1', id: '2' }];
    component.deleteIngrediente(4)
    await fixture.whenStable();
    setTimeout(()=> {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  
    }, 200)
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createCrepaSaladaIngredientePrincipal']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editCrepaSaladaIngredientePrincipal', 2]);
  });
});

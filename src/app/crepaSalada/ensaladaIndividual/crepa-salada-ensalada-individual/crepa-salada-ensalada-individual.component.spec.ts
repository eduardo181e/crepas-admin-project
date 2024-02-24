import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaEnsaladaIndividualComponent } from './crepa-salada-ensalada-individual.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('CrepaSaladaEnsaladaIndividualComponent', () => {
  let component: CrepaSaladaEnsaladaIndividualComponent;
  let fixture: ComponentFixture<CrepaSaladaEnsaladaIndividualComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let router: jasmine.SpyObj<Router>;
  let crepaSaladaService: jasmine.SpyObj<CrepaSaladaService>;
  let authService: jasmine.SpyObj<AuthService>;
  const mockensaladas = [{ ensalada_ind: 'Café', descripcion: 'asdadasd', inventario: '1', id: '2' },{ ensalada_ind: 'te', descripcion: 'asdadasd', inventario: '2', id: '4' } ];
  let ensaladasServiceMock = {
    getEnsaladas: jasmine.createSpy('getEnsaladas').and.returnValue(of(mockensaladas)),

  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang()').and.returnValue('es'),
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaService = jasmine.createSpyObj('ensaladasCalientesService', ['getEnsaladas']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ CrepaSaladaEnsaladaIndividualComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: ensaladasServiceMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaEnsaladaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ensaladasServiceMock.getEnsaladas.and.returnValue(of(mockensaladas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.ensaladas).toEqual(mockensaladas)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    ensaladasServiceMock.getEnsaladas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    ensaladasServiceMock.getEnsaladas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });


  it('should return an object without the object with the id that was deleted', async () => {
    const remIndex = mockensaladas.findIndex(i => i.id === '4')
    mockensaladas.splice(remIndex)
    ensaladasServiceMock.getEnsaladas.and.returnValue(of(mockensaladas))
    const mockensaladasRem = [{ ensalada_ind: 'Café', descripcion: 'asdadasd', inventario: '1', id: '2' }];
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.ensaladas).toEqual(mockensaladasRem)
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createCrepaSaladaEnsalada']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editCrepaSaladaEnsalada', 2]);
  });

});

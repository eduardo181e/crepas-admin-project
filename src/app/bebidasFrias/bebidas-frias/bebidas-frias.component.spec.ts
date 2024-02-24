import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasFriasComponent } from './bebidas-frias.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { BebidasFriasService } from 'src/app/services/bebidas.frias.service';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';

describe('BebidasFriasComponent', () => {
  let component: BebidasFriasComponent;
  let fixture: ComponentFixture<BebidasFriasComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let router: jasmine.SpyObj<Router>;
  let bebidasFriasService: jasmine.SpyObj<BebidasFriasService>;
  let authService: jasmine.SpyObj<AuthService>;
  const mockBebidas = [{ bebida: 'Café', descripcion: 'asdadasd', inventario: '1', id: '2' },{ bebida: 'te', descripcion: 'asdadasd', inventario: '2', id: '4' } ];
  let bebidasFriasServiceMock = {
    getBebidas: jasmine.createSpy('getBebidas').and.returnValue(of(mockBebidas)),

  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang()').and.returnValue('es'),
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    bebidasFriasService = jasmine.createSpyObj('BebidasCalientesService', ['getBebidas']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ BebidasFriasComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: BebidasFriasService, useValue: bebidasFriasServiceMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasFriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    bebidasFriasServiceMock.getBebidas.and.returnValue(of(mockBebidas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.bebidas).toEqual(mockBebidas)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    bebidasFriasServiceMock.getBebidas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    bebidasFriasServiceMock.getBebidas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });


  it('should return an object without the object with the id that was deleted', async () => {
    const remIndex = mockBebidas.findIndex(i => i.id === '4')
    mockBebidas.splice(remIndex)
    bebidasFriasServiceMock.getBebidas.and.returnValue(of(mockBebidas))
    const mockBebidasRem = [{ bebida: 'Café', descripcion: 'asdadasd', inventario: '1', id: '2' }];
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.bebidas).toEqual(mockBebidasRem)
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createBebidasFrias']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editBebidasFrias/'+ 2]);
  });

});

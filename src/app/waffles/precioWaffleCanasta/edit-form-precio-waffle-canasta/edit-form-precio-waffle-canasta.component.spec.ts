import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPrecioWaffleCanastaComponent } from './edit-form-precio-waffle-canasta.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { WaflesService } from 'src/app/services/wafles.service';

describe('EditFormPrecioWaffleCanastaComponent', () => {
  let component: EditFormPrecioWaffleCanastaComponent;
  let fixture: ComponentFixture<EditFormPrecioWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  let PrecioServiceMock = {
    getPrecio1: jasmine.createSpy('getPrecio11').and.returnValue(of([{precio: 40, descripcion: 'regular', id: 1}])),
    updatePrecio1: jasmine.createSpy('updatePrecio1').and.returnValue(of(true))
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ EditFormPrecioWaffleCanastaComponent, TranslatePipe ],
      providers: [ 
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaflesService, useValue: PrecioServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 123,
              },
            },
          },
        }, ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormPrecioWaffleCanastaComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the price that is going to be edited', () => {
    PrecioServiceMock.getPrecio1.and.returnValue(of([{precio: 40, descripcion: 'regular', id: 1}]));
    component.ngOnInit();
    expect(PrecioServiceMock.getPrecio1).toHaveBeenCalledWith(123)
    
      expect(component.precio).toEqual({precio: 40, descripcion: 'regular', id: 1})
    
  });

  it('should should return the price that is going to be edited error', () => {
    AuthServicMock.lang.and.returnValue('en')
    PrecioServiceMock.getPrecio1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.ngOnInit();
    expect(PrecioServiceMock.getPrecio1).toHaveBeenCalledWith(123)
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    
  });

  it('should should return the price that is going to be edited error (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    PrecioServiceMock.getPrecio1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.ngOnInit();
    expect(PrecioServiceMock.getPrecio1).toHaveBeenCalledWith(123)
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    
  });

  it('valid price error', () => {
    PrecioServiceMock.updatePrecio1.and.returnValue(of([{precio: 40, descripcion: 'regular', id: 1}]));
    AuthServicMock.lang.and.returnValue('en')
    component.precio.precio = 0
    component.precio.descripcion = 'regular'
    component.precio.id = 1
    component.updatePrecio()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a valid price');
  });

  it('precio valido error', () => {
    PrecioServiceMock.updatePrecio1.and.returnValue(of([{precio: 40, descripcion: 'regular', id: 1}]));
    AuthServicMock.lang.and.returnValue('es')
    component.precio.precio = 0
    component.precio.descripcion = 'regular'
    component.updatePrecio()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor coloca un precio válido');
  });

  it('correctly update price', () => {
    PrecioServiceMock.updatePrecio1.and.returnValue(of([{precio: 40, descripcion: 'regular', id: 1}]));
    AuthServicMock.lang.and.returnValue('en')
    component.precio.precio = 20
    component.precio.descripcion = 'regular'
    component.updatePrecio()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Price updated correctly');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/wafflesCanastaPrecio']);
  });

  it('precio actualizado crrectamente', () => {
    PrecioServiceMock.updatePrecio1.and.returnValue(of([{precio: 40, descripcion: 'regular', id: 1}]));
    AuthServicMock.lang.and.returnValue('es')
    component.precio.precio = 20
    component.precio.descripcion = 'regular'
    component.updatePrecio()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Precio actualizado correctamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/wafflesCanastaPrecio']);
  });

  it('precio actualizado crrectamente error (es)', () => {
    PrecioServiceMock.updatePrecio1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    AuthServicMock.lang.and.returnValue('es')
    component.precio.precio = 20
    component.precio.descripcion = 'regular'
    component.updatePrecio()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('precio actualizado crrectamente error', () => {
    PrecioServiceMock.updatePrecio1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    AuthServicMock.lang.and.returnValue('en')
    component.precio.precio = 20
    component.precio.descripcion = 'regular'
    component.updatePrecio()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDecoracionWaffleCanastaComponent } from './edit-form-decoracion.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { WaflesService } from 'src/app/services/wafles.service';

describe('EditFormDecoracionWaffleCanastaComponent', () => {
  let component: EditFormDecoracionWaffleCanastaComponent;
  let fixture: ComponentFixture<EditFormDecoracionWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let decoracionServiceMock = {
    getDecoracion: jasmine.createSpy('getDecoracion').and.returnValue(of([{decoracion: 'vainilla', inventario: '1', id: 1}])),
    updateDecoracion: jasmine.createSpy('updateDecoracion').and.returnValue(of([{decoracion: 'vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFormDecoracionWaffleCanastaComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaflesService, useValue: decoracionServiceMock},
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
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormDecoracionWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(decoracionServiceMock.getDecoracion).toHaveBeenCalledWith(123)
    decoracionServiceMock.getDecoracion.and.returnValue(of([{decoracion: 'vainilla', inventario: '1', id: 1}]))
    setTimeout(() => { 
      expect(component.decoracion).toEqual({decoracion: 'vainilla', inventario: '1', id: 1})
    }, 400)
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.decoracion.decoracion = ''
    component.decoracion.inventario = ''
    component.updateDecoracion();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the decoracion', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.decoracion.decoracion = ''
    component.decoracion.inventario = '1'
    component.updateDecoracion();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the snow');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.decoracion.decoracion = 'Vainilla'
    component.decoracion.inventario = ''
    component.updateDecoracion();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });


  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.decoracion.id = 1
    component.decoracion.decoracion = 'Vainilla'
    component.decoracion.inventario = '1'
    const bebida = {
      id:1,
      decoracion: 'Vainilla',
      inventario: '1'
    }
    component.updateDecoracion()
    expect(decoracionServiceMock.updateDecoracion).toHaveBeenCalledWith(bebida.id, bebida)
    decoracionServiceMock.updateDecoracion.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.decoracion.decoracion = ''
    component.decoracion.inventario = ''
    component.updateDecoracion();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the decoracion (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.decoracion.decoracion = ''
    component.decoracion.inventario = '1'
    component.updateDecoracion();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la decoracion');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.decoracion.decoracion = 'Vainilla'
    component.decoracion.inventario = ''
    component.updateDecoracion();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.decoracion.id = 1
    component.decoracion.decoracion = 'Vainilla'
    component.decoracion.inventario = '1'
    const bebida = {
      id:1,
      decoracion: 'Vainilla',
      inventario: '1',
    }
    component.updateDecoracion()
    expect(decoracionServiceMock.updateDecoracion).toHaveBeenCalledWith(bebida.id, bebida)
    decoracionServiceMock.updateDecoracion.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('decoracion guardada correctamente');
    }, 400)
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.decoracion.id = 1
    component.decoracion.decoracion = 'Vainilla'
    component.decoracion.inventario = '1'
    const bebida = {
      id:1,
      decoracion: 'Vainilla',
      inventario: '1'
    }
    component.updateDecoracion()
    expect(decoracionServiceMock.updateDecoracion).toHaveBeenCalledWith(bebida.id, bebida)
    decoracionServiceMock.updateDecoracion.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });
});

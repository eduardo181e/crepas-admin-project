import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCrepaDulceNieveComponent } from './edit-form-crepa-dulce-nieve.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { AuthService } from 'src/app/services/auth-service.service';

describe('EditFormCrepaDulceNieveComponent', () => {
  let component: EditFormCrepaDulceNieveComponent;
  let fixture: ComponentFixture<EditFormCrepaDulceNieveComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let NieveServiceMock = {
    getNieve: jasmine.createSpy('getNieve').and.returnValue(of([{nieve: 'vainilla', inventario: '1', id: 1}])),
    updateNieve: jasmine.createSpy('updateNieve').and.returnValue(of([{nieve: 'vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFormCrepaDulceNieveComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceService, useValue: NieveServiceMock},
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

    fixture = TestBed.createComponent(EditFormCrepaDulceNieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(NieveServiceMock.getNieve).toHaveBeenCalledWith(123)
    NieveServiceMock.getNieve.and.returnValue(of([{nieve: 'vainilla', inventario: '1', id: 1}]))
    setTimeout(() => { 
      expect(component.nieve).toEqual({nieve: 'vainilla', inventario: '1', id: 1})
    }, 400)
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = ''
    component.nieve.inventario = ''
    component.updatenieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the nieve', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = ''
    component.nieve.inventario = '1'
    component.updatenieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the snow');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = ''
    component.updatenieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });


  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.id = 1
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      id:1,
      nieve: 'Vainilla',
      inventario: '1'
    }
    component.updatenieve()
    expect(NieveServiceMock.updateNieve).toHaveBeenCalledWith(bebida.id, bebida)
    NieveServiceMock.updateNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = ''
    component.nieve.inventario = ''
    component.updatenieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the nieve (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = ''
    component.nieve.inventario = '1'
    component.updatenieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la nieve');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = ''
    component.updatenieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.id = 1
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      id:1,
      nieve: 'Vainilla',
      inventario: '1',
    }
    component.updatenieve()
    expect(NieveServiceMock.updateNieve).toHaveBeenCalledWith(bebida.id, bebida)
    NieveServiceMock.updateNieve.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('nieve guardada correctamente');
    }, 400)
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.id = 1
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      id:1,
      nieve: 'Vainilla',
      inventario: '1'
    }
    component.updatenieve()
    expect(NieveServiceMock.updateNieve).toHaveBeenCalledWith(bebida.id, bebida)
    NieveServiceMock.updateNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });
});

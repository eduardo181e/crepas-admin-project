import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormNieveComponent } from './create-form-nieve.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WaflesService } from 'src/app/services/wafles.service';

describe('CreateFormNieveComponent', () => {
  let component: CreateFormNieveComponent;
  let fixture: ComponentFixture<CreateFormNieveComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let NieveServiceMock = {
    saveNieve: jasmine.createSpy('saveNieve').and.returnValue(of([{nieve: 'vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormNieveComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaflesService, useValue: NieveServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormNieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = ''
    component.nieve.inventario = ''
    component.saveNewNieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the nieve', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = ''
    component.nieve.inventario = '1'
    component.saveNewNieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the snow');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = ''
    component.saveNewNieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      nieve: 'Vainilla',
      inventario: '1',
    }
    component.saveNewNieve()
    expect(NieveServiceMock.saveNieve).toHaveBeenCalledWith( bebida)
    NieveServiceMock.saveNieve.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ice cream saved correctly');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['crepaDulceNieve']);
    }, 400)
    
  });


  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      nieve: 'Vainilla',
      inventario: '1'
    }
    component.saveNewNieve()
    expect(NieveServiceMock.saveNieve).toHaveBeenCalledWith(bebida)
    NieveServiceMock.saveNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }))
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
    component.saveNewNieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the nieve (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = ''
    component.nieve.inventario = '1'
    component.saveNewNieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la nieve');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = ''
    component.saveNewNieve();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      nieve: 'Vainilla',
      inventario: '1',
    }
    component.saveNewNieve()
    expect(NieveServiceMock.saveNieve).toHaveBeenCalledWith( bebida)
    NieveServiceMock.saveNieve.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('nieve guardada correctamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['crepaDulceNieve']);
    }, 400)
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.nieve.nieve = 'Vainilla'
    component.nieve.inventario = '1'
    const bebida = {
      nieve: 'Vainilla',
      inventario: '1'
    }
    component.saveNewNieve()
    expect(NieveServiceMock.saveNieve).toHaveBeenCalledWith( bebida)
    NieveServiceMock.saveNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });
});


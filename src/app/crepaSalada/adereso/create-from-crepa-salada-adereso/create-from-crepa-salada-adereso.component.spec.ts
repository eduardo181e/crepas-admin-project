import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromCrepaSaladaAderesoComponent } from './create-from-crepa-salada-adereso.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('CreateFromCrepaSaladaAderesoComponent', () => {
  let component: CreateFromCrepaSaladaAderesoComponent;
  let fixture: ComponentFixture<CreateFromCrepaSaladaAderesoComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let AderesosServiceMock = {
    saveAdereso: jasmine.createSpy('saveAdereso').and.returnValue(of([{adereso: 'vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFromCrepaSaladaAderesoComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: AderesosServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFromCrepaSaladaAderesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = ''
    component.adereso.inventario = ''
    component.saveNewAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the adereso', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = ''
    component.adereso.inventario = '1'
    component.saveNewAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the dressing');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = ''
    component.saveNewAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      adereso: 'Vainilla',
      inventario: '1',
    }
    component.saveNewAdereso()
    expect(AderesosServiceMock.saveAdereso).toHaveBeenCalledWith( bebida)
    AderesosServiceMock.saveAdereso.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Dressing saved correctly');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['crepaDulceadereso']);
    }, 400)
    
  });


  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      adereso: 'Vainilla',
      inventario: '1'
    }
    component.saveNewAdereso()
    expect(AderesosServiceMock.saveAdereso).toHaveBeenCalledWith(bebida)
    AderesosServiceMock.saveAdereso.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = ''
    component.adereso.inventario = ''
    component.saveNewAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the adereso (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = ''
    component.adereso.inventario = '1'
    component.saveNewAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de el aderezo');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = ''
    component.saveNewAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      adereso: 'Vainilla',
      inventario: '1',
    }
    component.saveNewAdereso()
    expect(AderesosServiceMock.saveAdereso).toHaveBeenCalledWith( bebida)
    AderesosServiceMock.saveAdereso.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Aderezo guardada correctamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['crepaDulceadereso']);
    }, 400)
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      adereso: 'Vainilla',
      inventario: '1'
    }
    component.saveNewAdereso()
    expect(AderesosServiceMock.saveAdereso).toHaveBeenCalledWith( bebida)
    AderesosServiceMock.saveAdereso.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });
});

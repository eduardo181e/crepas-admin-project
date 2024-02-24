import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFromCrepaSaladaAderesoComponent } from './edit-from-crepa-salada-adereso.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('EditFromCrepaSaladaAderesoComponent', () => {
  let component: EditFromCrepaSaladaAderesoComponent;
  let fixture: ComponentFixture<EditFromCrepaSaladaAderesoComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let aderesoServiceMock = {
    getAdereso: jasmine.createSpy('getAdereso').and.returnValue(of([{adereso: 'vainilla', inventario: '1', id: 1}])),
    updateAdereso: jasmine.createSpy('updateAdereso').and.returnValue(of([{adereso: 'vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFromCrepaSaladaAderesoComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: aderesoServiceMock},
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

    fixture = TestBed.createComponent(EditFromCrepaSaladaAderesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(aderesoServiceMock.getAdereso).toHaveBeenCalledWith(123)
    aderesoServiceMock.getAdereso.and.returnValue(of([{adereso: 'Vainilla', inventario: '1', id: 1}]))
    
      expect(component.adereso).toEqual({adereso: 'Vainilla', inventario: '1', id: 1})
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = ''
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the adereso', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = ''
    component.adereso.inventario = '1'
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the dressing');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });


  it('should send the data correctly  error',async () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.id = 1
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso: 'Vainilla',
      inventario: '1'
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAdereso).toHaveBeenCalledWith(bebida.id, bebida)
    await aderesoServiceMock.updateAdereso.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)


  });

  it('should send the data correctly', () => {
    aderesoServiceMock.updateAdereso.and.returnValue(of([{adereso: 'vainilla', inventario: '1', id: 1}]))
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.id = 1
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso: 'Vainilla',
      inventario: '1',
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAdereso).toHaveBeenCalledWith(bebida.id, bebida)
    aderesoServiceMock.updateAdereso.and.returnValue(of())
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Dressing updated correctly');
   
    
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = ''
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the adereso (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = ''
    component.adereso.inventario = '1'
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de el aderezo');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    aderesoServiceMock.updateAdereso.and.returnValue(of([{adereso: 'vainilla', inventario: '1', id: 1}]))
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.id = 1
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso: 'Vainilla',
      inventario: '1',
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAdereso).toHaveBeenCalledWith(bebida.id, bebida)
    aderesoServiceMock.updateAdereso.and.returnValue(of())
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Aderezo actualizado correctamente');
   
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.id = 1
    component.adereso.adereso = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso: 'Vainilla',
      inventario: '1'
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAdereso).toHaveBeenCalledWith(bebida.id, bebida)
    aderesoServiceMock.updateAdereso.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)

    
  });
});

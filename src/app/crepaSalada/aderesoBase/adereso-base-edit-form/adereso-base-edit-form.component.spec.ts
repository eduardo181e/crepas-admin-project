import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AderesoBaseEditFormComponent } from './adereso-base-edit-form.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('AderesoBaseEditFormComponent', () => {
  let component: AderesoBaseEditFormComponent;
  let fixture: ComponentFixture<AderesoBaseEditFormComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let aderesoServiceMock = {
    getAderesoB: jasmine.createSpy('getAderesoB').and.returnValue(of([{adereso_base: 'Vainilla', inventario: '1', id: 1}])),
    updateAderesoB: jasmine.createSpy('updateAderesoB').and.returnValue(of([{adereso_base: 'Vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ AderesoBaseEditFormComponent, TranslatePipe ],
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

    fixture = TestBed.createComponent(AderesoBaseEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(aderesoServiceMock.getAderesoB).toHaveBeenCalledWith(123)
    aderesoServiceMock.getAderesoB.and.returnValue(of([{adereso_base: 'Vainilla', inventario: '1', id: 1}]))
    
      expect(component.adereso).toEqual({adereso_base: 'Vainilla', inventario: '1', id: 1})
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso_base = ''
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the adereso', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso_base = ''
    component.adereso.inventario = '1'
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the dressing');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.adereso_base = 'Vainilla'
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });


  it('should send the data correctly  error',async () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.id = 1
    component.adereso.adereso_base = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso_base: 'Vainilla',
      inventario: '1'
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAderesoB).toHaveBeenCalledWith(bebida.id, bebida)
    await aderesoServiceMock.updateAderesoB.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)


  });

  it('should send the data correctly', () => {
    aderesoServiceMock.updateAderesoB.and.returnValue(of([{adereso_base: 'vainilla', inventario: '1', id: 1}]))
    AuthServicMock.lang.and.returnValue('en')
    component.adereso.id = 1
    component.adereso.adereso_base = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso_base: 'Vainilla',
      inventario: '1',
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAderesoB).toHaveBeenCalledWith(bebida.id, bebida)
    aderesoServiceMock.updateAderesoB.and.returnValue(of())
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Dressing updated correctly');
   
    
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso_base = ''
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the adereso (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso_base = ''
    component.adereso.inventario = '1'
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de el aderezo');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.adereso_base = 'Vainilla'
    component.adereso.inventario = ''
    component.updateAdereso();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    aderesoServiceMock.updateAderesoB.and.returnValue(of([{adereso_base: 'Vainilla', inventario: '1', id: 1}]))
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.id = 1
    component.adereso.adereso_base = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso_base: 'Vainilla',
      inventario: '1',
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAderesoB).toHaveBeenCalledWith(bebida.id, bebida)
    aderesoServiceMock.updateAderesoB.and.returnValue(of())
    
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Aderezo actualizado correctamente');
   
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso.id = 1
    component.adereso.adereso_base = 'Vainilla'
    component.adereso.inventario = '1'
    const bebida = {
      id:1,
      adereso_base: 'Vainilla',
      inventario: '1'
    }
    component.updateAdereso()
    expect(aderesoServiceMock.updateAderesoB).toHaveBeenCalledWith(bebida.id, bebida)
    aderesoServiceMock.updateAderesoB.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)

    
  });
});

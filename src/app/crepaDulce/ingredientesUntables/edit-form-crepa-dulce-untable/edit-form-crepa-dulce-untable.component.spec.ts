import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCrepaDulceUntableComponent } from './edit-form-crepa-dulce-untable.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditFormCrepaDulceUntableComponent', () => {
  let component: EditFormCrepaDulceUntableComponent;
  let fixture: ComponentFixture<EditFormCrepaDulceUntableComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let IngredientesServiceMock = {
    getIngredienteU: jasmine.createSpy('getIngredienteU').and.returnValue(of([{ingrediente_unt: 'vainilla', inventario: '1', id: 1}])),
    updateIngredienteU: jasmine.createSpy('updateIngredienteU').and.returnValue(of([{ingrediente_unt: 'vainilla', inventario: '1', id: 1}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFormCrepaDulceUntableComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceService, useValue: IngredientesServiceMock},
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

    fixture = TestBed.createComponent(EditFormCrepaDulceUntableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(IngredientesServiceMock.getIngredienteU).toHaveBeenCalledWith(123)
    IngredientesServiceMock.getIngredienteU.and.returnValue(of([{ingrediente_unt: 'vainilla', inventario: '1', id: 1}]))
    setTimeout(() => { 
      expect(component.ingrediente).toEqual({ingrediente_unt: 'vainilla', inventario: '1', id: 1})
    }, 400)
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_unt = ''
    component.ingrediente.inventario = ''
    component.updateIngrediente(); 
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should order the ingrediente', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_unt = ''
    component.ingrediente.inventario = '1'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the ingredient');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_unt = 'Vainilla'
    component.ingrediente.inventario = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_unt = 'Vainilla'
    component.ingrediente.inventario = '1'
    const bebida = {
      id: 1,
      ingrediente_unt: 'Vainilla',
      inventario: '1',
    }
    component.updateIngrediente()
    expect(IngredientesServiceMock.updateIngredienteU).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesServiceMock.updateIngredienteU.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingredient updated successfully');
    }, 400)
    
  });


  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_unt = 'Vainilla'
    component.ingrediente.inventario = '1'
    const bebida = {
      id: 1,
      ingrediente_unt: 'Vainilla',
      inventario: '1'
    }
    component.updateIngrediente()
    expect(IngredientesServiceMock.updateIngredienteU).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesServiceMock.updateIngredienteU.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });


// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_unt = ''
    component.ingrediente.inventario = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('should order the ingrediente (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_unt = ''
    component.ingrediente.inventario = '1'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de el ingrediente');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_unt = 'Vainilla'
    component.ingrediente.inventario = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });


  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_unt = 'Vainilla'
    component.ingrediente.inventario = '1'
    const bebida = {
      id: 1,
      ingrediente_unt: 'Vainilla',
      inventario: '1',
    }
    component.updateIngrediente()
    expect(IngredientesServiceMock.updateIngredienteU).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesServiceMock.updateIngredienteU.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('ingrediente guardada correctamente');
    }, 400)
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_unt = 'Vainilla'
    component.ingrediente.inventario = '1'
    const bebida = {
      id:1,
      ingrediente_unt: 'Vainilla',
      inventario: '1'
    }
    component.updateIngrediente()
    expect(IngredientesServiceMock.updateIngredienteU).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesServiceMock.updateIngredienteU.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });
});

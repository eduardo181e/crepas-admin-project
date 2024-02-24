import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormIngredientesComplementariosWaffleCanastaComponent } from './create-form-ingredientes-complementarios.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

describe('CreateFormIngredientesComplementariosWaffleCanastaComponent', () => {
  let component: CreateFormIngredientesComplementariosWaffleCanastaComponent;
  let fixture: ComponentFixture<CreateFormIngredientesComplementariosWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let IngredientesComplemetariosServiceMock = {
    saveIngredienteC: jasmine.createSpy('saveIngredienteC').and.returnValue(of([{ingrediente_com: 'vainilla', inventario: '1', id: 1, tipo: 'Otros'}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormIngredientesComplementariosWaffleCanastaComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaffleCanastaService, useValue: IngredientesComplemetariosServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormIngredientesComplementariosWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (inventory)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (ingredient)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (type)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the ingrediente', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the ingredient');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should order the type', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please select what type your ingredient is');
  });

  it('should send the data correctly error', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.saveNewIngrediente()
    expect(IngredientesComplemetariosServiceMock.saveIngredienteC).toHaveBeenCalledWith(bebida)
    IngredientesComplemetariosServiceMock.saveIngredienteC.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
  
  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.saveNewIngrediente()
    expect(IngredientesComplemetariosServiceMock.saveIngredienteC).toHaveBeenCalledWith(bebida)
    IngredientesComplemetariosServiceMock.saveIngredienteC.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingredient saved correctly');
    }, 400)
    
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should ask for all the data (inventory(es)) ', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should ask for all the data (ingredient(es))', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should ask for all the data (type(es))', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should order the ingrediente (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de el ingrediente');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('should order the type (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.saveNewIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor selecciona de que tipo es tu ingrediente');
  });

  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.saveNewIngrediente()
    expect(IngredientesComplemetariosServiceMock.saveIngredienteC).toHaveBeenCalledWith( bebida)
    IngredientesComplemetariosServiceMock.saveIngredienteC.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('ingrediente guardada correctamente');
    }, 400)
    
  });

  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.saveNewIngrediente()
    expect(IngredientesComplemetariosServiceMock.saveIngredienteC).toHaveBeenCalledWith( bebida)
    IngredientesComplemetariosServiceMock.saveIngredienteC.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });
});

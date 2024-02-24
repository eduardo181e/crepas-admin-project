import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormIngredientesComplementariosWaffleCanastaComponent } from './edit-form-ingredientes-complementarios.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { of, throwError } from 'rxjs';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';

describe('EditFormIngredientesComplementariosWaffleCanastaComponent', () => {
  let component: EditFormIngredientesComplementariosWaffleCanastaComponent;
  let fixture: ComponentFixture<EditFormIngredientesComplementariosWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let IngredientesComplemetariosServiceMock = {
    getIngredienteC: jasmine.createSpy('getIngredienteC').and.returnValue(of([{ingrediente_com: 'vainilla', inventario: '1', id: 1, tipo: 'Otros'}])),
    updateIngredienteC: jasmine.createSpy('updateIngredienteC').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFormIngredientesComplementariosWaffleCanastaComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaffleCanastaService, useValue: IngredientesComplemetariosServiceMock},
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

    fixture = TestBed.createComponent(EditFormIngredientesComplementariosWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(IngredientesComplemetariosServiceMock.getIngredienteC).toHaveBeenCalledWith(123)
    IngredientesComplemetariosServiceMock.getIngredienteC.and.returnValue(of([{ingrediente_com: 'vainilla', inventario: '1', id: 1, tipo: 'Otros'}]))
    setTimeout(() => { 
      expect(component.ingrediente).toEqual({ingrediente_com: 'vainilla', inventario: '1', id: 1, tipo: 'Otros'})
    }, 400)
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (inventory)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (ingredient)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (type)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the ingrediente', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the ingredient');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should order the type', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please select what type your ingredient is');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      id: 1,
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.updateIngrediente()
    expect(IngredientesComplemetariosServiceMock.updateIngredienteC).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesComplemetariosServiceMock.updateIngredienteC.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingredient updated correctly');
    }, 400)
    
  });

  it('should send the data correctly error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      id: 1,
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.updateIngrediente()
    expect(IngredientesComplemetariosServiceMock.updateIngredienteC).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesComplemetariosServiceMock.updateIngredienteC.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });

// Español
  it('should ask for all the data (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should ask for all the data (inventory(es)) ', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should ask for all the data (ingredient(es))', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should ask for all the data (type(es))', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should order the ingrediente (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = ''
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de el ingrediente');
  });

  it('should order the inventory (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = ''
    component.ingrediente.tipo = 'Otros'
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('should order the type (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = ''
    component.updateIngrediente();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor selecciona de que tipo es tu ingrediente');
  });

  it('should send the data correctly (es)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      id: 1,
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.updateIngrediente()
    expect(IngredientesComplemetariosServiceMock.updateIngredienteC).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesComplemetariosServiceMock.updateIngredienteC.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingrediente actualizado correctamente');
    }, 400)
    
  });


  it('should send the data correctly (es) error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ingrediente.id = 1
    component.ingrediente.ingrediente_com = 'Vainilla'
    component.ingrediente.inventario = '1'
    component.ingrediente.tipo = 'Otros'
    const bebida = {
      id: 1,
      ingrediente_com: 'Vainilla',
      inventario: '1',
      tipo: 'Otros',
    }
    component.updateIngrediente()
    expect(IngredientesComplemetariosServiceMock.updateIngredienteC).toHaveBeenCalledWith(bebida.id, bebida)
    IngredientesComplemetariosServiceMock.updateIngredienteC.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });

});

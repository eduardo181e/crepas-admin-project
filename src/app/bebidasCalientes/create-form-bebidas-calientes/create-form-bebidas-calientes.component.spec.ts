import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormBebidasCalientesComponent } from './create-form-bebidas-calientes.component';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BebidasCalientesService } from 'src/app/services/bebidas-calientes.service';
import { AuthService } from 'src/app/services/auth-service.service';

describe('CreateFormBebidasCalientesComponent', () => {
  let component: CreateFormBebidasCalientesComponent;
  let fixture: ComponentFixture<CreateFormBebidasCalientesComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let BebidasCalientesServiceMock = {
    saveBebida: jasmine.createSpy('getBebidasCalientes').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('es'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormBebidasCalientesComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: BebidasCalientesService, useValue: BebidasCalientesServiceMock},
        { provide: AuthService, useValue: AuthServicMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormBebidasCalientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (bebida)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.bebida = 'Cafe'
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (descripcion)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.descripcion = 'Cafe'
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (precio)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.precio = 20
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (inventario)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.inventario = 'inventario'
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the drink', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.bebida = ''
    component.bebida.descripcion = 'Cafe'
    component.bebida.precio = 20
    component.bebida.inventario = 'inventario'
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the drink');
  });

  it('should order the description', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.bebida = 'Cafe'
    component.bebida.descripcion = ''
    component.bebida.precio = 20
    component.bebida.inventario = 'inventario'
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a description');
  });

  it('should order the price', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.bebida = 'Cafe'
    component.bebida.descripcion = 'descripcion'
    component.bebida.precio = 0
    component.bebida.inventario = 'inventario'
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a price');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.bebida = 'Cafe'
    component.bebida.descripcion = 'descripcion'
    component.bebida.precio = 20
    component.bebida.inventario = ''
    component.saveNewBebida();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.bebida.bebida = 'Cafe'
    component.bebida.descripcion = 'descripcion'
    component.bebida.precio = 20
    component.bebida.inventario = '1'
    component.saveNewBebida();
    const bebida = {
      bebida: 'Cafe',
      descripcion: 'descripcion',
      precio: 20,
      inventario: '1'
    }
    expect(BebidasCalientesServiceMock.saveBebida).toHaveBeenCalledWith(bebida)
  });

    // En español
    it('deberia pedir todos los datos', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
    });
  
    it('deberia pedir todos los datos (bebida)', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.bebida = 'Cafe'
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
    });
  
    it('deben pedir todos los datos (descripcion)', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.descripcion = 'Cafe'
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
    });
  
    it('deberia pedir todos los datos (precio)', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.precio = 20
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
    });
  
    it('debe pedir todos los datos (inventario)', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.inventario = 'inventario'
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
    });
  
    it('deberías pedir la bebida', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.bebida = ''
      component.bebida.descripcion = 'Cafe'
      component.bebida.precio = 20
      component.bebida.inventario = 'inventario'
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la bebida');
    });
  
    it('debe pedir la descripción', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.bebida = 'Cafe'
      component.bebida.descripcion = ''
      component.bebida.precio = 20
      component.bebida.inventario = 'inventario'
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa una descripción');
    });
  
    it('deberia pedir el precio', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.bebida = 'Cafe'
      component.bebida.descripcion = 'descripcion'
      component.bebida.precio = 0
      component.bebida.inventario = 'inventario'
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un precio');
    });
  
    it('debe ordenar el inventario', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.bebida = 'Cafe'
      component.bebida.descripcion = 'descripcion'
      component.bebida.precio = 20
      component.bebida.inventario = ''
      component.saveNewBebida();
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
    });
  
    it('debe enviar los datos correctamente', () => {
      AuthServicMock.lang.and.returnValue('es')
      component.bebida.bebida = 'Cafe'
      component.bebida.descripcion = 'descripcion'
      component.bebida.precio = 20
      component.bebida.inventario = '1'
      component.saveNewBebida();
      const bebida = {
        bebida: 'Cafe',
        descripcion: 'descripcion',
        precio: 20,
        inventario: '1'
      }
      expect(BebidasCalientesServiceMock.saveBebida).toHaveBeenCalledWith(bebida)
    });
});

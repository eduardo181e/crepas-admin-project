import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromCrepaSaladaEnsaladaIndividualComponent } from './create-from-crepa-salada-ensalada-individual.component';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('CreateFormensaladasCalientesComponent', () => {
  let component: CreateFromCrepaSaladaEnsaladaIndividualComponent;
  let fixture: ComponentFixture<CreateFromCrepaSaladaEnsaladaIndividualComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let BotanasStockService = {
    saveEnsalada: jasmine.createSpy('saveEnsalada').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFromCrepaSaladaEnsaladaIndividualComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: BotanasStockService},
        { provide: AuthService, useValue: AuthServicMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFromCrepaSaladaEnsaladaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (ensalada)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (descripcion)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.descripcion = 'Cafe'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should ask for all the data (inventario)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.inventario = 'inventario'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the drink', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = 'Cafe'
    
    component.ensalada.inventario = 'inventario'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the salad');
  });

  it('should order the description', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = 'inventario'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a description');
  });


  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = ''
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = '1'
    component.saveNewEnsalada();
    const ensalada = {
      ensalada_ind: 'Cafe',
      descripcion: 'descripcion',
      inventario: '1'
    }
    expect(BotanasStockService.saveEnsalada).toHaveBeenCalledWith(ensalada)
  });

  // En español
  it('deberia pedir todos los datos', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberia pedir todos los datos (ensalada)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deben pedir todos los datos (descripcion)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.descripcion = 'Cafe'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('debe pedir todos los datos (inventario)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.inventario = 'inventario'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberías pedir la ensalada', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = 'Cafe'
    
    component.ensalada.inventario = 'inventario'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la ensalada');
  });

  it('debe pedir la descripción', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = 'inventario'
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa una descripción');
  });


  it('debe ordenar el inventario', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = ''
    component.saveNewEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('debe enviar los datos correctamente', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = '1'
    component.saveNewEnsalada();
    const ensalada = {
      ensalada_ind: 'Cafe',
      descripcion: 'descripcion',
      inventario: '1'
    }
    expect(BotanasStockService.saveEnsalada).toHaveBeenCalledWith(ensalada)
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFromCrepaSaladaEnsaladaIndividualComponent } from './edit-from-crepa-salada-ensalada-individual.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('EditFromCrepaSaladaEnsaladaIndividualComponent', () => {
  let component: EditFromCrepaSaladaEnsaladaIndividualComponent;
  let fixture: ComponentFixture<EditFromCrepaSaladaEnsaladaIndividualComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let ensaladasFriasServiceMock = {
    getEnsalada: jasmine.createSpy('getEnsalada').and.returnValue(of([{ensalada_ind: 'cafe', descripcion: 'cafe',  inventario: '1'}])),
    updateEnsalada: jasmine.createSpy('updateEnsalada').and.returnValue(of([{ensalada_ind: 'cafe', descripcion: 'cafe',  inventario: '1'}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFromCrepaSaladaEnsaladaIndividualComponent, TranslatePipe],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: ensaladasFriasServiceMock},
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
        { provide: AuthService, useValue: AuthServicMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFromCrepaSaladaEnsaladaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(ensaladasFriasServiceMock.getEnsalada).toHaveBeenCalledWith(123)
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (ensalada)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (descripcion)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = 'Cafe'
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (inventario)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = 'inventario'
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the drink', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = 'Cafe'
    
    component.ensalada.inventario = 'inventario'
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the salad');
  });

  it('should order the description', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = 'inventario'
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a description');
  });


  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.ensalada.id = 1
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = '1'
    component.updateEnsalada();
    const ensalada = {
      id: 1,
      ensalada_ind: 'Cafe',
      descripcion: 'descripcion',
      
      inventario: '1'
    }
    expect(ensaladasFriasServiceMock.updateEnsalada).toHaveBeenCalledWith(ensalada.id, ensalada)
  });
  // En español
  it('deberia pedir todos los datos', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberia pedir todos los datos (ensalada)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deben pedir todos los datos (descripcion)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = 'Cafe'
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('debe pedir todos los datos (inventario)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = 'inventario'
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberías pedir la ensalada', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = ''
    component.ensalada.descripcion = 'Cafe'
    
    component.ensalada.inventario = 'inventario'
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la ensalada');
  });

  it('debe pedir la descripción', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = ''
    
    component.ensalada.inventario = 'inventario'
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa una descripción');
  });


  it('debe ordenar el inventario', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = ''
    component.updateEnsalada();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('debe enviar los datos correctamente', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada.id = 1
    component.ensalada.ensalada_ind = 'Cafe'
    component.ensalada.descripcion = 'descripcion'
    
    component.ensalada.inventario = '1'
    component.updateEnsalada();
    const ensalada = {
      id: 1,
      ensalada_ind: 'Cafe',
      descripcion: 'descripcion',
      
      inventario: '1'
    }
    expect(ensaladasFriasServiceMock.updateEnsalada).toHaveBeenCalledWith(ensalada.id, ensalada)
  });
});

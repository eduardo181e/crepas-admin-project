import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCrepaSaladaBotanaComponent } from './edit-form-crepa-salada-botana.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of } from 'rxjs';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('EditFormCrepaSaladaBotanaComponent', () => {
  let component: EditFormCrepaSaladaBotanaComponent;
  let fixture: ComponentFixture<EditFormCrepaSaladaBotanaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let botanasFriasServiceMock = {
    getBotana: jasmine.createSpy('getBotana').and.returnValue(of([{botana: 'cafe', precio: 20, inventario: '1'}])),
    updateBotana: jasmine.createSpy('updateBotana').and.returnValue(of([{botana: 'cafe', precio: 20, inventario: '1'}])),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFormCrepaSaladaBotanaComponent, TranslatePipe],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: botanasFriasServiceMock},
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

    fixture = TestBed.createComponent(EditFormCrepaSaladaBotanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(botanasFriasServiceMock.getBotana).toHaveBeenCalledWith(123)
  });


  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = ''
    component.botana.precio = 0
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (botana)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    component.botana.precio = 0
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should ask for all the data (precio)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = ''
    
    component.botana.precio = 20
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (inventario)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = ''
    
    component.botana.precio = 0
    component.botana.inventario = 'inventario'
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the drink', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = ''
    
    component.botana.precio = 20
    component.botana.inventario = 'inventario'
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the snack');
  });

  it('should order the price', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 0
    component.botana.inventario = 'inventario'
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a price');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.id = 1
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = '1'
    component.updateBotana();
    const botana = {
      id: 1,
      botana: 'Cafe',
      
      precio: 20,
      inventario: '1'
    }
    expect(botanasFriasServiceMock.updateBotana).toHaveBeenCalledWith(botana.id, botana)
  });
  // En español
  it('deberia pedir todos los datos', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = ''
    
    component.botana.precio = 0
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberia pedir todos los datos (botana)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 0
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('deberia pedir todos los datos (precio)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = ''
    
    component.botana.precio = 20
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('debe pedir todos los datos (inventario)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = ''
    
    component.botana.precio = 0
    component.botana.inventario = 'inventario'
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberías pedir la botana', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = ''
    
    component.botana.precio = 20
    component.botana.inventario = 'inventario'
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la botana');
  });

  it('deberia pedir el precio', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 0
    component.botana.inventario = 'inventario'
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un precio');
  });

  it('debe ordenar el inventario', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = ''
    component.updateBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('debe enviar los datos correctamente', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.id = 1
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = '1'
    component.updateBotana();
    const botana = {
      id: 1,
      botana: 'Cafe',
      
      precio: 20,
      inventario: '1'
    }
    expect(botanasFriasServiceMock.updateBotana).toHaveBeenCalledWith(botana.id, botana)
  });
});

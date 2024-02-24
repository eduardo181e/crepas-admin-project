import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormCrepaSaladaBotanaComponent } from './create-form-crepa-salada-botana.component';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('CreateFormbotanasCalientesComponent', () => {
  let component: CreateFormCrepaSaladaBotanaComponent;
  let fixture: ComponentFixture<CreateFormCrepaSaladaBotanaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let botanaServiceMock = {
    saveBotana: jasmine.createSpy('saveBotana').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormCrepaSaladaBotanaComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: botanaServiceMock},
        { provide: AuthService, useValue: AuthServicMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormCrepaSaladaBotanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (botana)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });


  it('should ask for all the data (precio)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.precio = 20
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should ask for all the data (inventario)', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.inventario = 'inventario'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the drink', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = ''
    component.botana.precio = 20
    component.botana.inventario = 'inventario'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the snack');
  });


  it('should order the price', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 0
    component.botana.inventario = 'inventario'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter a price');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = ''
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = '1'
    component.saveNewBotana();
    const botana = {
      botana: 'Cafe', 
      precio: 20,
      inventario: '1'
    }
    expect(botanaServiceMock.saveBotana).toHaveBeenCalledWith(botana)
  });

  // En español
  it('deberia pedir todos los datos', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberia pedir todos los datos (botana)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });


  it('deberia pedir todos los datos (precio)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.precio = 20
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('debe pedir todos los datos (inventario)', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.inventario = 'inventario'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('deberías pedir la botana', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = ''
    component.botana.precio = 20
    component.botana.inventario = 'inventario'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la botana');
  });

  it('deberia pedir el precio', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 0
    component.botana.inventario = 'inventario'
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un precio');
  });

  it('debe ordenar el inventario', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = ''
    component.saveNewBotana();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('debe enviar los datos correctamente', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.botana.botana = 'Cafe'
    
    component.botana.precio = 20
    component.botana.inventario = '1'
    component.saveNewBotana();
    const botana = {
      botana: 'Cafe',
      
      precio: 20,
      inventario: '1'
    }
    expect(botanaServiceMock.saveBotana).toHaveBeenCalledWith(botana)
  });
});

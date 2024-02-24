import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormCrepaDulceHarinaComponent } from './create-form-crepa-dulce-harina.component';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { AuthService } from 'src/app/services/auth-service.service';

describe('CreateFormCrepaDulceHarinaComponent', () => {
  let component: CreateFormCrepaDulceHarinaComponent;
  let fixture: ComponentFixture<CreateFormCrepaDulceHarinaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let HarinasServiceMock = {
    saveHarina: jasmine.createSpy('saveHarina').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormCrepaDulceHarinaComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceService, useValue: HarinasServiceMock},
        { provide: AuthService, useValue: AuthServicMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormCrepaDulceHarinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = ''
    component.harina.inventario = ''
    component.saveNewHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the flour', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = ''
    component.harina.inventario = '1'
    component.saveNewHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the flour');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = ''
    component.saveNewHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = '1'
    const bebida = {
      harina: 'Vainilla',
      inventario: '1'
    }
    component.saveNewHarina()
    expect(HarinasServiceMock.saveHarina).toHaveBeenCalledWith(bebida)
    HarinasServiceMock.saveHarina.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Flour saved correctly');
    }, 400)
    
  });

  it('should send the data correctly error', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = '1'
    const bebida = {
      harina: 'Vainilla',
      inventario: '1'
    }
    component.saveNewHarina()
    expect(HarinasServiceMock.saveHarina).toHaveBeenCalledWith(bebida)
    HarinasServiceMock.saveHarina.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });

// Español
  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = ''
    component.harina.inventario = ''
    component.saveNewHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should order the flour', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = ''
    component.harina.inventario = '1'
    component.saveNewHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la harina');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = ''
    component.saveNewHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = '1'
    const bebida = {
      harina: 'Vainilla',
      inventario: '1'
    }
    component.saveNewHarina()
    expect(HarinasServiceMock.saveHarina).toHaveBeenCalledWith(bebida)
    HarinasServiceMock.saveHarina.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Harina guardada correctamente');
    }, 400)
    
  });

  it('should send the data correctly error', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = '1'
    const bebida = {
      harina: 'Vainilla',
      inventario: '1'
    }
    component.saveNewHarina()
    expect(HarinasServiceMock.saveHarina).toHaveBeenCalledWith(bebida)
    HarinasServiceMock.saveHarina.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
    
  });


});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaBotanaComponent } from './crepa-salada-botana.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';

describe('CrepaSaladaBotanaComponent', () => {
  let component: CrepaSaladaBotanaComponent;
  let fixture: ComponentFixture<CrepaSaladaBotanaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let router: jasmine.SpyObj<Router>;
  let crepaSaladaService: jasmine.SpyObj<CrepaSaladaService>;
  let authService: jasmine.SpyObj<AuthService>;
  const mockbotanas = [{ botana: 'Café', inventario: '1', id: '2' },{ botana: 'te', inventario: '2', id: '4' } ];
  let botanasServiceMock = {
    getBotanas: jasmine.createSpy('getBotanas').and.returnValue(of(mockbotanas)),

  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang()').and.returnValue('es'),
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaService = jasmine.createSpyObj('CrepaSaladaService', ['getBotanas']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ CrepaSaladaBotanaComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaService, useValue: botanasServiceMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaBotanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    botanasServiceMock.getBotanas.and.returnValue(of(mockbotanas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.botanas).toEqual(mockbotanas)
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    botanasServiceMock.getBotanas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    botanasServiceMock.getBotanas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });


  it('should return an object without the object with the id that was deleted', async () => {
    const remIndex = mockbotanas.findIndex(i => i.id === '4')
    mockbotanas.splice(remIndex)
    botanasServiceMock.getBotanas.and.returnValue(of(mockbotanas))
    const mockbotanasRem = [{ botana: 'Café', inventario: '1', id: '2' }];
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.botanas).toEqual(mockbotanasRem)
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createCrepaSaladaBotana']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editCrepaSaladaBotana', 2]);
  });

});

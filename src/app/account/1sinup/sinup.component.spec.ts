import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SinupComponent } from './sinup.component';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { SigninAdminService } from 'src/app/services/signin-admin.service';

import { TranslateService } from 'src/app/translate/translate.service';
import { Router } from '@angular/router';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { of } from 'rxjs';

describe('SinupComponent', () => {
  let component: SinupComponent;
  let fixture: ComponentFixture<SinupComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let signinAdminService: jasmine.SpyObj<SigninAdminService>;
  let router: jasmine.SpyObj<Router>;
  let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  let signinAdminServiceMock = {
    signUp: jasmine.createSpy('signUp').and.returnValue(of({token: testToken})) // Simula una respuesta exitosa
  };

  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    signinAdminService = jasmine.createSpyObj('SigninAdminService', ['signUp']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ SinupComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: SigninAdminService, useValue: signinAdminService },
        { provide: Router, useValue: router },
        { provide: SigninAdminService, useValue: signinAdminServiceMock },
        TranslateService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

7
  it('should show alert when username, password and fullname are empty', () => {
    component.username = '';
    component.password = '';
    component.fullname = '';
    component.lang = 'en';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter a username and password');
  });

  it('username empty', () => {
    component.username = '';
    component.password = 'test Password';
    component.fullname = 'test Fullname';
    component.lang = 'en';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter a username');
  });

  it('password empty', () => {
    component.username = 'test Username';
    component.password = '';
    component.fullname = 'test Fullname';
    component.lang = 'en';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter a password');
  });

  it('fullname empty', () => {
    component.username = 'test Username';
    component.password = 'test Password';
    component.fullname = '';
    component.lang = 'en';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter your full name');
  });

  it('language empty', () => {
    component.username = 'test Username';
    component.password = 'test Password';
    component.fullname = 'test Fullname';
    component.lang = '';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Select a language');
  });

  it('all information empty', () => {
    component.username = '';
    component.password = '';
    component.fullname = 'test Fullname';
    component.lang = 'en';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please provide all necessary information');
  });

  // Test en español
  it('Falta de nombre de usuario y contraseña', () => {
    component.username = '';
    component.password = '';
    component.fullname = '';
    component.lang = 'es';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa un usuario y contraseña');
  });

  it('Falta de nombre de usuario', () => {
    component.username = '';
    component.password = 'test Password';
    component.fullname = 'test Fullname';
    component.lang = 'es';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa un usuario');
  });

  it('Falta de contraseña', () => {
    component.username = 'test Username';
    component.password = '';
    component.fullname = 'test Fullname';
    component.lang = 'es';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa una contraseña');
  });

  it('Falta de nombre completo', () => {
    component.username = 'test Username';
    component.password = 'test Password';
    component.fullname = '';
    component.lang = 'es';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa tu nombre completo');
  });


  it('Falta de toda la informacion', () => {
    component.username = '';
    component.password = '';
    component.fullname = 'test Fullname';
    component.lang = 'es';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor proporciona toda la información necesaria');
  });

  it('Bienvenida al usuario', () => {
    component.username = 'testUser' + Math.floor(Math.random() * 1000000);
    component.password = 'test Password';
    component.fullname = 'test Fullname';
    component.lang = 'es';
    component.Login();
    expect(signinAdminServiceMock.signUp).toHaveBeenCalled();
  });

  it('Welcome to the user', () => {
    component.username = 'testUser' + Math.floor(Math.random() * 1000000);
    component.password = 'test Password';
    component.fullname = 'test Fullname';
    component.lang = 'es';
    component.Login();
    expect(signinAdminServiceMock.signUp).toHaveBeenCalled();
  });

  // Agrega más pruebas para los otros casos
});
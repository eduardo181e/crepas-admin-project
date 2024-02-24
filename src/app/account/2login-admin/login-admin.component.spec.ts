import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { LoginAdminComponent } from './login-admin.component';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { of } from 'rxjs';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let router: jasmine.SpyObj<Router>;
  let signinAdminService: jasmine.SpyObj<SigninAdminService>;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJFZHVhcmRvQmFuNTkiLCJmdWxsbmFtZSI6IjA1MDkiLCJsYW5nIjoiZXMiLCJwYXNzd29yZCI6IiQyYSQxMCRWQUxEVnNEQmxLLi9lZHdtdkFnck5lMWpFMk5pQlFqQjJkVmdlNUM1U1VxTlRXQ05WMmNPTyIsImlhdCI6MTcwNjgwNDk1MSwiZXhwIjoxNzA2ODA4NTUxfQ.fwlnHPW4Jeb67jcMyaqbGE6FpnVSCwU8t7KWG1xk2EM';
  let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  let signinAdminServiceMock = {
    login: jasmine.createSpy('signIn').and.returnValue(of({token: testToken})) // Simula una respuesta exitosa
  };
  let routerMock = {
    navigate: jasmine.createSpy('navigate')
  };


  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    signinAdminService = jasmine.createSpyObj('SigninAdminService', ['signIn']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ LoginAdminComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: router },
        { provide: SigninAdminService, useValue: signinAdminServiceMock },
      { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask for the password and username', () => {
    localStorage.removeItem('token');
    component.username = '';
    component.password = '';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter a username and password');
  });

  it('should ask for the username', () => {
    localStorage.removeItem('token');
    component.username = '';
    component.password = 'test';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter a username');
  });

  it('should ask for the password', () => {
    localStorage.removeItem('token');
    component.username = 'test';
    component.password = '';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter a password');
  });

  it('You will have to access the application', () => {
    localStorage.removeItem('token');
    component.username = 'test';
    component.password = 'test';
    component.Login();
    expect(signinAdminServiceMock.login).toHaveBeenCalled();
  });

  it('deberia de pedir la contraseña', () => {
    localStorage.setItem('token', token);
    component.username = 'test';
    component.password = '';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa una contraseña');
  });

  it('deberia de pedir el usuario', () => {
    localStorage.setItem('token', token);
    component.username = '';
    component.password = 'test';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa un usuario');
  });

  it('deberia de pedir el usuario y contraseña', () => {
    localStorage.setItem('token', token);
    component.username = '';
    component.password = '';
    component.Login();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa un usuario y contraseña');
  });

  it('Deberia de acceder a la aplicacion', () => {
    localStorage.setItem('token', token);
    component.username = 'test';
    component.password = 'test';
    component.Login();
    expect(signinAdminServiceMock.login).toHaveBeenCalled();
  });

  
});

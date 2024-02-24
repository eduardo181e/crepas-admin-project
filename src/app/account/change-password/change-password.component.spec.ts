import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { of } from 'rxjs';
import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let signinAdminService: jasmine.SpyObj<SigninAdminService>;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJFZHVhcmRvQmFuNTkiLCJmdWxsbmFtZSI6IjA1MDkiLCJsYW5nIjoiZXMiLCJwYXNzd29yZCI6IiQyYSQxMCRWQUxEVnNEQmxLLi9lZHdtdkFnck5lMWpFMk5pQlFqQjJkVmdlNUM1U1VxTlRXQ05WMmNPTyIsImlhdCI6MTcwNjgwNDk1MSwiZXhwIjoxNzA2ODA4NTUxfQ.fwlnHPW4Jeb67jcMyaqbGE6FpnVSCwU8t7KWG1xk2EM';
  let enToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJFZHVhcmRvQmFuNTkiLCJmdWxsbmFtZSI6IjA1MDkiLCJsYW5nIjoiZW4iLCJwYXNzd29yZCI6IiQyYSQxMCRWQUxEVnNEQmxLLi9lZHdtdkFnck5lMWpFMk5pQlFqQjJkVmdlNUM1U1VxTlRXQ05WMmNPTyIsImlhdCI6MTcwNjgxOTM0MSwiZXhwIjoxNzA2ODIyOTM4fQ.UPCulCYLNcaXcXQiQ7dpYS59yBeUEqd2IZWT0J8Dxl4'
  let signinAdminServiceMock = {
    changePassword: jasmine.createSpy('changePassword').and.returnValue(of({token: token})), // Simula una respuesta exitosa
  };
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    signinAdminService = jasmine.createSpyObj('SigninAdminService', ['changelang', 'changePassword']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ ChangePasswordComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: router },
        { provide: SigninAdminService, useValue: signinAdminServiceMock },
      ]
    })
    .compileComponents();
    localStorage.setItem('token', token);

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error that the password is missing', () => {
    component.oldPassword = ''
    component.newPassword = 'test'
    component.updatePassword()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa tu contraseña actual');

  });

  it('should show an error that the new password is missing', () => {
    component.oldPassword = 'test'
    component.newPassword = ''
    component.updatePassword()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Ingresa tu contraseña nueva');

  });

  it('should ask that the current password and the new one not be the same', () => {
    component.oldPassword = 'test'
    component.newPassword = 'test'
    component.updatePassword()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('La contraseña nueva no puede ser igual a la anterior');

  });

  it('should tell you that the password was updated correctly', () => {
    component.oldPassword = 'test'
    component.newPassword = 'test1'
    component.updatePassword()
    expect(signinAdminServiceMock.changePassword).toHaveBeenCalledWith(component.oldPassword, component.newPassword);

  });

  it('deria mostrar un error por la falta de contraseña', () => {
    localStorage.removeItem('token')
    localStorage.setItem('token', enToken)
    component.oldPassword = ''
    component.newPassword = 'test'
    component.updatePassword()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter your current password');

  });

  it('deria mostrar un error por la falta de nueva contraseña', () => {
    localStorage.removeItem('token')
    localStorage.setItem('token', enToken)
    component.oldPassword = 'test'
    component.newPassword = ''
    component.updatePassword()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Enter your new password');

  });

  it('deria mostrar un error dicendo que la contraseña actual y la nueva contraseña no deben de ser igules', () => {
    localStorage.removeItem('token')
    localStorage.setItem('token', enToken)
    component.oldPassword = 'test'
    component.newPassword = 'test'
    component.updatePassword()
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('The new password cannot be the same as the previous one');

  });

  it('deberia de decir que la contraeña se actualizo correctamente', () => {
    localStorage.removeItem('token')
    localStorage.setItem('token', enToken)
    component.oldPassword = 'test'
    component.newPassword = 'test1'
    component.updatePassword()
    expect(signinAdminServiceMock.changePassword).toHaveBeenCalledWith(component.oldPassword, component.newPassword);

  });
});

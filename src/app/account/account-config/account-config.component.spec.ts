import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { SigninAdminService } from 'src/app/services/signin-admin.service';
import { of } from 'rxjs';

import { AccountConfigComponent } from './account-config.component';

describe('AccountConfigComponent', () => {
  let component: AccountConfigComponent;
  let fixture: ComponentFixture<AccountConfigComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let signinAdminService: jasmine.SpyObj<SigninAdminService>;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJFZHVhcmRvQmFuNTkiLCJmdWxsbmFtZSI6IjA1MDkiLCJsYW5nIjoiZXMiLCJwYXNzd29yZCI6IiQyYSQxMCRWQUxEVnNEQmxLLi9lZHdtdkFnck5lMWpFMk5pQlFqQjJkVmdlNUM1U1VxTlRXQ05WMmNPTyIsImlhdCI6MTcwNjgwNDk1MSwiZXhwIjoxNzA2ODA4NTUxfQ.fwlnHPW4Jeb67jcMyaqbGE6FpnVSCwU8t7KWG1xk2EM';
  let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  let signinAdminServiceMock = {
    changeUsername: jasmine.createSpy('changeUsername').and.returnValue(of({token: token})), // Simula una respuesta exitosa
    changelang: jasmine.createSpy('changeLang').and.returnValue(of({token: token})), // Simula una respuesta exitosa
  };
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    signinAdminService = jasmine.createSpyObj('SigninAdminService', ['changelang']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ AccountConfigComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: router },
        { provide: SigninAdminService, useValue: signinAdminServiceMock },
      ]
    })
    .compileComponents();
    localStorage.setItem('token', token);

    fixture = TestBed.createComponent(AccountConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to changePassword', () => {
    component.redirectUpdatePass();
    expect(router.navigate).toHaveBeenCalledWith(['changePassword']);
  });

  it('should update the user', () => {
    component.updateUsuario();
    expect(signinAdminServiceMock.changeUsername).toHaveBeenCalledWith(component.username, component.fullname);
  });

  it('should update the lang', () => {
    component.changeLanguage();
    expect(signinAdminServiceMock.changelang).toHaveBeenCalledWith(component.lang);
  });
  

  
});

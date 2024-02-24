import { ComponentFixture, TestBed} from '@angular/core/testing';

import { CreateFormCrepaDulcePreciosComponent } from './create-form-crepa-dulce-precios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';

describe('CreateFormCrepaDulcePreciosComponent', () => {
  let component: CreateFormCrepaDulcePreciosComponent;
  let fixture: ComponentFixture<CreateFormCrepaDulcePreciosComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaDulceService: jasmine.SpyObj<CrepaDulceService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const preciosServiceMock = {
    savePrecio : jasmine.createSpy('savePrecio').and.returnValue(of([{precio: 0,descripcion: ''}]))
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaDulceService = jasmine.createSpyObj('CrepaDulceService', ['savePrecio']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormCrepaDulcePreciosComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        {provide: CrepaDulceService, useValue: preciosServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormCrepaDulcePreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });           

  it('save precio', () => {
    preciosServiceMock.savePrecio.and.returnValue(of([{precio: 0,descripcion: ''}]))
    component.precio.precio = 20;
    component.precio.descripcion = 'regular';
    component.saveNewPrecio();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/crepaDulcePrecio']);
  });

  it('save precio error', () => {
    preciosServiceMock.savePrecio.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.precio.precio = 20;
    component.precio.descripcion = 'regular';
    component.saveNewPrecio();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });
  
});

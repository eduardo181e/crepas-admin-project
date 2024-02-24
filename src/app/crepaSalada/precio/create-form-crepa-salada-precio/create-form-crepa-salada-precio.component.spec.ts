import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { CreateFormCrepaSaladaPrecioComponent } from './create-form-crepa-salada-precio.component';

describe('CreateFormCrepaSaladaPrecioComponent', () => {
  let component: CreateFormCrepaSaladaPrecioComponent;
  let fixture: ComponentFixture<CreateFormCrepaSaladaPrecioComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaSaladaService: jasmine.SpyObj<CrepaSaladaService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const preciosServiceMock = {
    savePrecio : jasmine.createSpy('savePrecio').and.returnValue(of([{precio: 0,descripcion: ''}]))
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaService = jasmine.createSpyObj('CrepaDulceService', ['savePrecio']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormCrepaSaladaPrecioComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        {provide: CrepaSaladaService, useValue: preciosServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormCrepaSaladaPrecioComponent);
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
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/crepaSaladaPrecio']);
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

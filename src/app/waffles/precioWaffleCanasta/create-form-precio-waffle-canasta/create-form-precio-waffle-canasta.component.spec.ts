import { ComponentFixture, TestBed} from '@angular/core/testing';

import { CreateFormPrecioWaffleCanastaComponent } from './create-form-precio-waffle-canasta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { WaflesService } from 'src/app/services/wafles.service';

describe('CreateFormPrecioWaffleCanastaComponent', () => {
  let component: CreateFormPrecioWaffleCanastaComponent;
  let fixture: ComponentFixture<CreateFormPrecioWaffleCanastaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let waflesService: jasmine.SpyObj<WaflesService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const preciosServiceMock = {
    savePrecio1 : jasmine.createSpy('savePrecio1').and.returnValue(of([{precio: 0,descripcion: ''}]))
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    waflesService = jasmine.createSpyObj('WaflesService', ['savePrecio1']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ CreateFormPrecioWaffleCanastaComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        {provide: WaflesService, useValue: preciosServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormPrecioWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });           

  it('save precio', () => {
    preciosServiceMock.savePrecio1.and.returnValue(of([{precio: 0,descripcion: ''}]))
    component.precio.precio = 20;
    component.precio.descripcion = 'regular';
    component.saveNewPrecio();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/wafflesCanastaPrecio']);
  });

  it('save precio error', () => {
    preciosServiceMock.savePrecio1.and.returnValue(throwError({ error: { message: 'Token expired' } }));
    component.precio.precio = 20;
    component.precio.descripcion = 'regular';
    component.saveNewPrecio();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });
  
});

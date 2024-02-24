import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BebidasCalientesComponent } from './bebidas-calientes.component';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BebidasCalientesService } from 'src/app/services/bebidas-calientes.service';

describe('BebidasCalientesComponent', () => {
  let component: BebidasCalientesComponent;
  let fixture: ComponentFixture<BebidasCalientesComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let router: jasmine.SpyObj<Router>;
  let bebidasCalientesService: jasmine.SpyObj<BebidasCalientesService>;
  
  const mockBebidas = [{ bebida: 'Café', descripcion: 'asdadasd', inventario: '1', id: '2' },{ bebida: 'te', descripcion: 'asdadasd', inventario: '2', id: '4' } ];
  let bebidasCalientesServiceMock = {
    getBebidas: jasmine.createSpy('getBebidas').and.returnValue(of(mockBebidas)),

  }

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    bebidasCalientesService = jasmine.createSpyObj('BebidasCalientesService', ['getBebidas']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ BebidasCalientesComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: BebidasCalientesService, useValue: bebidasCalientesServiceMock },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasCalientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    bebidasCalientesServiceMock.getBebidas.and.returnValue(of(mockBebidas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.bebidas).toEqual(mockBebidas)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    bebidasCalientesServiceMock.getBebidas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should return an object without the object with the id that was deleted', async () => {
    const remIndex = mockBebidas.findIndex(i => i.id === '4')
    mockBebidas.splice(remIndex)
    bebidasCalientesServiceMock.getBebidas.and.returnValue(of(mockBebidas))
    const mockBebidasRem = [{ bebida: 'Café', descripcion: 'asdadasd', inventario: '1', id: '2' }];
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.bebidas).toEqual(mockBebidasRem)
  });

  it('should navigate to create', () => {
    component.navigateCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['createBebidasCalientes']);
  });

  it('should navigate to edit', () => {
    component.navigateEdit(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['editBebidasCalientes/'+ 2]);
  });

});

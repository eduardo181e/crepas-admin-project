import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaIngredientePrincipalStockComponent } from './crepa-salada-ingrediente-principal-stock.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';
import { AuthService } from 'src/app/services/auth-service.service';

describe('CrepaSaladaIngredientePrincipalStockComponent', () => {
  let component: CrepaSaladaIngredientePrincipalStockComponent;
  let fixture: ComponentFixture<CrepaSaladaIngredientePrincipalStockComponent>;
  let crepaSaladaStockService: jasmine.SpyObj<CrepaSaladaStockService>
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockIngredientes = [{ ingrediente_pri: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ ingrediente_pri: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockIngredientesExistencia = [{ ingrediente_pri: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ ingrediente_pri: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockIngredientesInventario = [{ ingrediente_pri: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ ingrediente_pri: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let IngredientesStockServiceMock = {
    getIngredientesPrincipales: jasmine.createSpy('getIngredientesPrincipales').and.returnValue(of(mockIngredientes)),
    updateStockIngredientePrincipal: jasmine.createSpy('updateStockIngredientePrincipal').and.returnValue(of(mockIngredientesExistencia))
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaStockService = jasmine.createSpyObj('CrepaSaladaStockService', ['getIngredientesPrincipales', 'updateStockIngredientePrincipal']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaSaladaIngredientePrincipalStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaStockService, useValue: IngredientesStockServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    IngredientesStockServiceMock.getIngredientesPrincipales.and.returnValue(of(mockIngredientes))
    fixture = TestBed.createComponent(CrepaSaladaIngredientePrincipalStockComponent);
    AuthServicMock.lang.and.returnValue('en')
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    IngredientesStockServiceMock.getIngredientesPrincipales.and.returnValue(of(mockIngredientes))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.ingredientes).toEqual(mockIngredientes)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    await IngredientesStockServiceMock.getIngredientesPrincipales.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockIngredientesExistencia[1], mockIngredientesExistencia[1].id)
    expect(IngredientesStockServiceMock.updateStockIngredientePrincipal).toHaveBeenCalledWith(mockIngredientesExistencia[1].id,{existencia: mockIngredientesExistencia[1].existencia, cantidad: mockIngredientesExistencia[1].cantidad, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredientePrincipal.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesPrincipales).toHaveBeenCalledWith(component.ingrediente1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockIngredientesExistencia[1], mockIngredientesExistencia[1].id)
    expect(IngredientesStockServiceMock.updateStockIngredientePrincipal).toHaveBeenCalledWith(mockIngredientesExistencia[1].id,{existencia: mockIngredientesExistencia[1].existencia, cantidad: mockIngredientesExistencia[1].cantidad, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredientePrincipal.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockIngredientesExistencia[1], mockIngredientesExistencia[1].id)
    expect(IngredientesStockServiceMock.updateStockIngredientePrincipal).toHaveBeenCalledWith(mockIngredientesExistencia[1].id,{existencia: mockIngredientesExistencia[1].existencia, cantidad: mockIngredientesExistencia[1].cantidad, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredientePrincipal.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesPrincipales).toHaveBeenCalledWith(component.ingrediente1)
     IngredientesStockServiceMock.getIngredientesPrincipales.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockIngredientesInventario[0], mockIngredientesInventario[0].id)
    expect(IngredientesStockServiceMock.updateStockIngredientePrincipal).toHaveBeenCalledWith(mockIngredientesInventario[0].id,{existencia: mockIngredientesInventario[0].existencia, cantidad: mockIngredientesInventario[0].cantidad, inventario: mockIngredientesInventario[0].inventario, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredientePrincipal.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesPrincipales).toHaveBeenCalledWith(component.ingrediente1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockIngredientesInventario[0], mockIngredientesInventario[0].id)
    expect(IngredientesStockServiceMock.updateStockIngredientePrincipal).toHaveBeenCalledWith(mockIngredientesInventario[0].id,{existencia: mockIngredientesInventario[0].existencia, cantidad: mockIngredientesInventario[0].cantidad, inventario: mockIngredientesInventario[0].inventario, sucursal_id: component.ingrediente1.sucursal_id});
     IngredientesStockServiceMock.updateStockIngredientePrincipal.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockIngredientesInventario[0], mockIngredientesInventario[0].id)
    expect(IngredientesStockServiceMock.updateStockIngredientePrincipal).toHaveBeenCalledWith(mockIngredientesInventario[0].id,{existencia: mockIngredientesInventario[0].existencia, cantidad: mockIngredientesInventario[0].cantidad, inventario: mockIngredientesInventario[0].inventario, sucursal_id: component.ingrediente1.sucursal_id});
     IngredientesStockServiceMock.updateStockIngredientePrincipal.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesPrincipales).toHaveBeenCalledWith(component.ingrediente1)
     IngredientesStockServiceMock.getIngredientesPrincipales.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

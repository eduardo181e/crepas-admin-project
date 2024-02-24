import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WafflesIngredienteComplementarioStockComponent } from './waffles-ingrediente-complementario-stock.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { WafflesStockService } from 'src/app/services/stock/waffles-stock.service';

describe('WafflesIngredienteComplementarioStockComponent', () => {
  let component: WafflesIngredienteComplementarioStockComponent;
  let fixture: ComponentFixture<WafflesIngredienteComplementarioStockComponent>;
  let wafflesStockService: jasmine.SpyObj<WafflesStockService>
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockIngredientes = [{ ingrediente_com: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ ingrediente_com: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockIngredientesExistencia = [{ ingrediente_com: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ ingrediente_com: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockIngredientesInventario = [{ ingrediente_com: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ ingrediente_com: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let IngredientesStockServiceMock = {
    getIngredientesComplementarios: jasmine.createSpy('getIngredientesComplementarios').and.returnValue(of(mockIngredientes)),
    updateStockIngredienteComplementario: jasmine.createSpy('updateStockIngredienteComplementario').and.returnValue(of(mockIngredientesExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    wafflesStockService = jasmine.createSpyObj('WafflesStockService', ['getIngredientesComplementarios', 'updateStockIngredienteComplementario']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ WafflesIngredienteComplementarioStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WafflesStockService, useValue: IngredientesStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    IngredientesStockServiceMock.getIngredientesComplementarios.and.returnValue(of(mockIngredientes))
    fixture = TestBed.createComponent(WafflesIngredienteComplementarioStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    IngredientesStockServiceMock.getIngredientesComplementarios.and.returnValue(of(mockIngredientes))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.ingredientes).toEqual(mockIngredientes)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    IngredientesStockServiceMock.getIngredientesComplementarios.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockIngredientesExistencia[1], mockIngredientesExistencia[1].id)
    expect(IngredientesStockServiceMock.updateStockIngredienteComplementario).toHaveBeenCalledWith(mockIngredientesExistencia[1].id,{existencia: mockIngredientesExistencia[1].existencia, cantidad: mockIngredientesExistencia[1].cantidad, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredienteComplementario.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesComplementarios).toHaveBeenCalledWith(component.ingrediente1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockIngredientesExistencia[1], mockIngredientesExistencia[1].id)
    expect(IngredientesStockServiceMock.updateStockIngredienteComplementario).toHaveBeenCalledWith(mockIngredientesExistencia[1].id,{existencia: mockIngredientesExistencia[1].existencia, cantidad: mockIngredientesExistencia[1].cantidad, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredienteComplementario.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockIngredientesExistencia[1], mockIngredientesExistencia[1].id)
    expect(IngredientesStockServiceMock.updateStockIngredienteComplementario).toHaveBeenCalledWith(mockIngredientesExistencia[1].id,{existencia: mockIngredientesExistencia[1].existencia, cantidad: mockIngredientesExistencia[1].cantidad, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredienteComplementario.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesComplementarios).toHaveBeenCalledWith(component.ingrediente1)
     IngredientesStockServiceMock.getIngredientesComplementarios.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockIngredientesInventario[0], mockIngredientesInventario[0].id)
    expect(IngredientesStockServiceMock.updateStockIngredienteComplementario).toHaveBeenCalledWith(mockIngredientesInventario[0].id,{existencia: mockIngredientesInventario[0].existencia, cantidad: mockIngredientesInventario[0].cantidad, inventario: mockIngredientesInventario[0].inventario, sucursal_id: component.ingrediente1.sucursal_id});
    await IngredientesStockServiceMock.updateStockIngredienteComplementario.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesComplementarios).toHaveBeenCalledWith(component.ingrediente1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockIngredientesInventario[0], mockIngredientesInventario[0].id)
    expect(IngredientesStockServiceMock.updateStockIngredienteComplementario).toHaveBeenCalledWith(mockIngredientesInventario[0].id,{existencia: mockIngredientesInventario[0].existencia, cantidad: mockIngredientesInventario[0].cantidad, inventario: mockIngredientesInventario[0].inventario, sucursal_id: component.ingrediente1.sucursal_id});
     IngredientesStockServiceMock.updateStockIngredienteComplementario.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.ingrediente1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockIngredientesInventario[0], mockIngredientesInventario[0].id)
    expect(IngredientesStockServiceMock.updateStockIngredienteComplementario).toHaveBeenCalledWith(mockIngredientesInventario[0].id,{existencia: mockIngredientesInventario[0].existencia, cantidad: mockIngredientesInventario[0].cantidad, inventario: mockIngredientesInventario[0].inventario, sucursal_id: component.ingrediente1.sucursal_id});
     IngredientesStockServiceMock.updateStockIngredienteComplementario.and.returnValue(of(mockSucursalId))
     expect(IngredientesStockServiceMock.getIngredientesComplementarios).toHaveBeenCalledWith(component.ingrediente1)
     IngredientesStockServiceMock.getIngredientesComplementarios.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

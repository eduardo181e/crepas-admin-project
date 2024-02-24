import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaAderesoStockComponent } from './crepa-salada-adereso-stock.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';

describe('CrepaDulceAdereoStockComponent', () => {
  let component: CrepaSaladaAderesoStockComponent;
  let fixture: ComponentFixture<CrepaSaladaAderesoStockComponent>;
  let crepaSaladaStockService: jasmine.SpyObj<CrepaSaladaStockService>
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockaderesos = [{ adereso: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ adereso: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockaderesosExistencia = [{ adereso: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ adereso: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockaderesosInventario = [{ adereso: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ adereso: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let aderesosStockServiceMock = {
    getAderezos: jasmine.createSpy('getAderezos').and.returnValue(of(mockaderesos)),
    updateStockAderezo: jasmine.createSpy('updateStockAderezo').and.returnValue(of(mockaderesosExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaStockService = jasmine.createSpyObj('CrepaSaladaStockService', ['getAderezos', 'updateStockAderezo']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaSaladaAderesoStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaStockService, useValue: aderesosStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    aderesosStockServiceMock.getAderezos.and.returnValue(of(mockaderesos))
    fixture = TestBed.createComponent(CrepaSaladaAderesoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    aderesosStockServiceMock.getAderezos.and.returnValue(of(mockaderesos))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.aderesos).toEqual(mockaderesos)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    aderesosStockServiceMock.getAderezos.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockaderesosExistencia[1], mockaderesosExistencia[1].id)
    expect(aderesosStockServiceMock.updateStockAderezo).toHaveBeenCalledWith(mockaderesosExistencia[1].id,{existencia: mockaderesosExistencia[1].existencia, cantidad: mockaderesosExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await aderesosStockServiceMock.updateStockAderezo.and.returnValue(of(mockSucursalId))
     expect(aderesosStockServiceMock.getAderezos).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockaderesosExistencia[1], mockaderesosExistencia[1].id)
    expect(aderesosStockServiceMock.updateStockAderezo).toHaveBeenCalledWith(mockaderesosExistencia[1].id,{existencia: mockaderesosExistencia[1].existencia, cantidad: mockaderesosExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await aderesosStockServiceMock.updateStockAderezo.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockaderesosExistencia[1], mockaderesosExistencia[1].id)
    expect(aderesosStockServiceMock.updateStockAderezo).toHaveBeenCalledWith(mockaderesosExistencia[1].id,{existencia: mockaderesosExistencia[1].existencia, cantidad: mockaderesosExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await aderesosStockServiceMock.updateStockAderezo.and.returnValue(of(mockSucursalId))
     expect(aderesosStockServiceMock.getAderezos).toHaveBeenCalledWith(component.bebida1)
     aderesosStockServiceMock.getAderezos.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockaderesosInventario[0], mockaderesosInventario[0].id)
    expect(aderesosStockServiceMock.updateStockAderezo).toHaveBeenCalledWith(mockaderesosInventario[0].id,{existencia: mockaderesosInventario[0].existencia, cantidad: mockaderesosInventario[0].cantidad, inventario: mockaderesosInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
    await aderesosStockServiceMock.updateStockAderezo.and.returnValue(of(mockSucursalId))
     expect(aderesosStockServiceMock.getAderezos).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockaderesosInventario[0], mockaderesosInventario[0].id)
    expect(aderesosStockServiceMock.updateStockAderezo).toHaveBeenCalledWith(mockaderesosInventario[0].id,{existencia: mockaderesosInventario[0].existencia, cantidad: mockaderesosInventario[0].cantidad, inventario: mockaderesosInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     aderesosStockServiceMock.updateStockAderezo.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockaderesosInventario[0], mockaderesosInventario[0].id)
    expect(aderesosStockServiceMock.updateStockAderezo).toHaveBeenCalledWith(mockaderesosInventario[0].id,{existencia: mockaderesosInventario[0].existencia, cantidad: mockaderesosInventario[0].cantidad, inventario: mockaderesosInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     aderesosStockServiceMock.updateStockAderezo.and.returnValue(of(mockSucursalId))
     expect(aderesosStockServiceMock.getAderezos).toHaveBeenCalledWith(component.bebida1)
     aderesosStockServiceMock.getAderezos.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

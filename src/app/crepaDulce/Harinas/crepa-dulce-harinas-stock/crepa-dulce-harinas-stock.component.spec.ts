import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceHarinasStockComponent } from './crepa-dulce-harinas-stock.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CrepaDulceStockService } from 'src/app/services/stock/crepa-dulce-stock.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';

describe('CrepaDulceHarinasStockComponent', () => {
  let component: CrepaDulceHarinasStockComponent;
  let fixture: ComponentFixture<CrepaDulceHarinasStockComponent>;
  let crepaDulceStockService: jasmine.SpyObj<CrepaDulceStockService>
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockHarinas = [{ harina: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ harina: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockHarinasExistencia = [{ harina: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ harina: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockHarinasInventario = [{ harina: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ harina: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let HarinasStockServiceMock = {
    getHarinas: jasmine.createSpy('getHarinasCalientes').and.returnValue(of(mockHarinas)),
    updateStockHarina: jasmine.createSpy('updateStockHarinaCaliente').and.returnValue(of(mockHarinasExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaDulceStockService = jasmine.createSpyObj('CrepaDulceStockService', ['getHarinas', 'updateStockHarina']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaDulceHarinasStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceStockService, useValue: HarinasStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    HarinasStockServiceMock.getHarinas.and.returnValue(of(mockHarinas))
    fixture = TestBed.createComponent(CrepaDulceHarinasStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    HarinasStockServiceMock.getHarinas.and.returnValue(of(mockHarinas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.harinas).toEqual(mockHarinas)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    HarinasStockServiceMock.getHarinas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockHarinasExistencia[1], mockHarinasExistencia[1].id)
    expect(HarinasStockServiceMock.updateStockHarina).toHaveBeenCalledWith(mockHarinasExistencia[1].id,{existencia: mockHarinasExistencia[1].existencia, cantidad: mockHarinasExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await HarinasStockServiceMock.updateStockHarina.and.returnValue(of(mockSucursalId))
     expect(HarinasStockServiceMock.getHarinas).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockHarinasExistencia[1], mockHarinasExistencia[1].id)
    expect(HarinasStockServiceMock.updateStockHarina).toHaveBeenCalledWith(mockHarinasExistencia[1].id,{existencia: mockHarinasExistencia[1].existencia, cantidad: mockHarinasExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await HarinasStockServiceMock.updateStockHarina.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockHarinasExistencia[1], mockHarinasExistencia[1].id)
    expect(HarinasStockServiceMock.updateStockHarina).toHaveBeenCalledWith(mockHarinasExistencia[1].id,{existencia: mockHarinasExistencia[1].existencia, cantidad: mockHarinasExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await HarinasStockServiceMock.updateStockHarina.and.returnValue(of(mockSucursalId))
     expect(HarinasStockServiceMock.getHarinas).toHaveBeenCalledWith(component.bebida1)
     HarinasStockServiceMock.getHarinas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockHarinasInventario[0], mockHarinasInventario[0].id)
    expect(HarinasStockServiceMock.updateStockHarina).toHaveBeenCalledWith(mockHarinasInventario[0].id,{existencia: mockHarinasInventario[0].existencia, cantidad: mockHarinasInventario[0].cantidad, inventario: mockHarinasInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
    await HarinasStockServiceMock.updateStockHarina.and.returnValue(of(mockSucursalId))
     expect(HarinasStockServiceMock.getHarinas).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockHarinasInventario[0], mockHarinasInventario[0].id)
    expect(HarinasStockServiceMock.updateStockHarina).toHaveBeenCalledWith(mockHarinasInventario[0].id,{existencia: mockHarinasInventario[0].existencia, cantidad: mockHarinasInventario[0].cantidad, inventario: mockHarinasInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     HarinasStockServiceMock.updateStockHarina.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockHarinasInventario[0], mockHarinasInventario[0].id)
    expect(HarinasStockServiceMock.updateStockHarina).toHaveBeenCalledWith(mockHarinasInventario[0].id,{existencia: mockHarinasInventario[0].existencia, cantidad: mockHarinasInventario[0].cantidad, inventario: mockHarinasInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     HarinasStockServiceMock.updateStockHarina.and.returnValue(of(mockSucursalId))
     expect(HarinasStockServiceMock.getHarinas).toHaveBeenCalledWith(component.bebida1)
     HarinasStockServiceMock.getHarinas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasFriasStockComponent } from './bebidas-frias-stock.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { BebidasCalientesStockService } from 'src/app/services/stock/bebidas-calientes-stock.service';
import { IdService } from 'src/app/services/id.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BebidasFriasStockService } from 'src/app/services/stock/bebidas-frias-stock.service';

describe('BebidasCalientesStockComponent', () => {
  let component: BebidasFriasStockComponent;
  let fixture: ComponentFixture<BebidasFriasStockComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let bebidasCalientesStockService: jasmine.SpyObj<BebidasCalientesStockService>;
  let idService: jasmine.SpyObj<IdService>;
  const mockBebidas = [{ bebida: 'Café', descripcion: 'asdadasd', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ bebida: 'te', descripcion: 'asdadasd', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockBebidasExistencia = [{ bebida: 'Café', descripcion: 'asdadasd', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ bebida: 'te', descripcion: 'asdadasd', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockBebidasInventario = [{ bebida: 'Café', descripcion: 'asdadasd', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ bebida: 'te', descripcion: 'asdadasd', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let BebidasFriasStockServiceMock = {
    getBebidasFrias: jasmine.createSpy('getBebidasCalientes').and.returnValue(of(mockBebidas)),
    updateStockBebidaFria: jasmine.createSpy('updateStockBebidaCaliente').and.returnValue(of(mockBebidasExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    bebidasCalientesStockService = jasmine.createSpyObj('BebidasCalientesService', ['getBebidasCalientes', 'updateStockBebidaCaliente']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ BebidasFriasStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: BebidasFriasStockService, useValue: BebidasFriasStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    BebidasFriasStockServiceMock.getBebidasFrias.and.returnValue(of(mockBebidas))
    fixture = TestBed.createComponent(BebidasFriasStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    BebidasFriasStockServiceMock.getBebidasFrias.and.returnValue(of(mockBebidas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.bebidas).toEqual(mockBebidas)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    BebidasFriasStockServiceMock.getBebidasFrias.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockBebidasExistencia[1], mockBebidasExistencia[1].id)
    expect(BebidasFriasStockServiceMock.updateStockBebidaFria).toHaveBeenCalledWith(mockBebidasExistencia[1].id,{existencia: mockBebidasExistencia[1].existencia, cantidad: mockBebidasExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await BebidasFriasStockServiceMock.updateStockBebidaFria.and.returnValue(of(mockSucursalId))
     expect(BebidasFriasStockServiceMock.getBebidasFrias).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockBebidasExistencia[1], mockBebidasExistencia[1].id)
    expect(BebidasFriasStockServiceMock.updateStockBebidaFria).toHaveBeenCalledWith(mockBebidasExistencia[1].id,{existencia: mockBebidasExistencia[1].existencia, cantidad: mockBebidasExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    BebidasFriasStockServiceMock.updateStockBebidaFria.and.returnValue(of(mockSucursalId))
    expect(BebidasFriasStockServiceMock.getBebidasFrias).toHaveBeenCalledWith(component.bebida1)
    await BebidasFriasStockServiceMock.getBebidasFrias.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockBebidasExistencia[1], mockBebidasExistencia[1].id)
    expect(BebidasFriasStockServiceMock.updateStockBebidaFria).toHaveBeenCalledWith(mockBebidasExistencia[1].id,{existencia: mockBebidasExistencia[1].existencia, cantidad: mockBebidasExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await BebidasFriasStockServiceMock.updateStockBebidaFria.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockBebidasInventario[0], mockBebidasInventario[0].id)
    expect(BebidasFriasStockServiceMock.updateStockBebidaFria).toHaveBeenCalledWith(mockBebidasInventario[0].id,{existencia: mockBebidasInventario[0].existencia, cantidad: mockBebidasInventario[0].cantidad, inventario: mockBebidasInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
    await BebidasFriasStockServiceMock.updateStockBebidaFria.and.returnValue(of(mockSucursalId))
     expect(BebidasFriasStockServiceMock.getBebidasFrias).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockBebidasInventario[0], mockBebidasInventario[0].id)
    expect(BebidasFriasStockServiceMock.updateStockBebidaFria).toHaveBeenCalledWith(mockBebidasInventario[0].id,{existencia: mockBebidasInventario[0].existencia, cantidad: mockBebidasInventario[0].cantidad, inventario: mockBebidasInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     BebidasFriasStockServiceMock.updateStockBebidaFria.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockBebidasInventario[0], mockBebidasInventario[0].id)
    expect(BebidasFriasStockServiceMock.updateStockBebidaFria).toHaveBeenCalledWith(mockBebidasInventario[0].id,{existencia: mockBebidasInventario[0].existencia, cantidad: mockBebidasInventario[0].cantidad, inventario: mockBebidasInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     BebidasFriasStockServiceMock.updateStockBebidaFria.and.returnValue(of(mockSucursalId))
     expect(BebidasFriasStockServiceMock.getBebidasFrias).toHaveBeenCalledWith(component.bebida1)
     await BebidasFriasStockServiceMock.getBebidasFrias.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

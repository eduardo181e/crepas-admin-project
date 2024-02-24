import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceNieveStockComponent } from './crepa-dulce-nieve-stock.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CrepaDulceStockService } from 'src/app/services/stock/crepa-dulce-stock.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';

describe('CrepaDulceIngredineteComplemetarioStockComponent', () => {
  let component: CrepaDulceNieveStockComponent;
  let fixture: ComponentFixture<CrepaDulceNieveStockComponent>;
  let crepaDulceStockService: jasmine.SpyObj<CrepaDulceStockService>
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mocknieves = [{ nieve: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ nieve: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mocknievesExistencia = [{ nieve: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ nieve: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mocknievesInventario = [{ nieve: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ nieve: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let NievesStockServiceMock = {
    getNieves: jasmine.createSpy('getNieves').and.returnValue(of(mocknieves)),
    updateStockNieve: jasmine.createSpy('updateStockNieve').and.returnValue(of(mocknievesExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaDulceStockService = jasmine.createSpyObj('CrepaDulceStockService', ['getNieves', 'updateStockNieve']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaDulceNieveStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceStockService, useValue: NievesStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    NievesStockServiceMock.getNieves.and.returnValue(of(mocknieves))
    fixture = TestBed.createComponent(CrepaDulceNieveStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    NievesStockServiceMock.getNieves.and.returnValue(of(mocknieves))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.nieves).toEqual(mocknieves)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    NievesStockServiceMock.getNieves.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mocknievesExistencia[1], mocknievesExistencia[1].id)
    expect(NievesStockServiceMock.updateStockNieve).toHaveBeenCalledWith(mocknievesExistencia[1].id,{existencia: mocknievesExistencia[1].existencia, cantidad: mocknievesExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await NievesStockServiceMock.updateStockNieve.and.returnValue(of(mockSucursalId))
     expect(NievesStockServiceMock.getNieves).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mocknievesExistencia[1], mocknievesExistencia[1].id)
    expect(NievesStockServiceMock.updateStockNieve).toHaveBeenCalledWith(mocknievesExistencia[1].id,{existencia: mocknievesExistencia[1].existencia, cantidad: mocknievesExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await NievesStockServiceMock.updateStockNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mocknievesExistencia[1], mocknievesExistencia[1].id)
    expect(NievesStockServiceMock.updateStockNieve).toHaveBeenCalledWith(mocknievesExistencia[1].id,{existencia: mocknievesExistencia[1].existencia, cantidad: mocknievesExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await NievesStockServiceMock.updateStockNieve.and.returnValue(of(mockSucursalId))
     expect(NievesStockServiceMock.getNieves).toHaveBeenCalledWith(component.bebida1)
     NievesStockServiceMock.getNieves.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mocknievesInventario[0], mocknievesInventario[0].id)
    expect(NievesStockServiceMock.updateStockNieve).toHaveBeenCalledWith(mocknievesInventario[0].id,{existencia: mocknievesInventario[0].existencia, cantidad: mocknievesInventario[0].cantidad, inventario: mocknievesInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
    await NievesStockServiceMock.updateStockNieve.and.returnValue(of(mockSucursalId))
     expect(NievesStockServiceMock.getNieves).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mocknievesInventario[0], mocknievesInventario[0].id)
    expect(NievesStockServiceMock.updateStockNieve).toHaveBeenCalledWith(mocknievesInventario[0].id,{existencia: mocknievesInventario[0].existencia, cantidad: mocknievesInventario[0].cantidad, inventario: mocknievesInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     NievesStockServiceMock.updateStockNieve.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mocknievesInventario[0], mocknievesInventario[0].id)
    expect(NievesStockServiceMock.updateStockNieve).toHaveBeenCalledWith(mocknievesInventario[0].id,{existencia: mocknievesInventario[0].existencia, cantidad: mocknievesInventario[0].cantidad, inventario: mocknievesInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     NievesStockServiceMock.updateStockNieve.and.returnValue(of(mockSucursalId))
     expect(NievesStockServiceMock.getNieves).toHaveBeenCalledWith(component.bebida1)
     NievesStockServiceMock.getNieves.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

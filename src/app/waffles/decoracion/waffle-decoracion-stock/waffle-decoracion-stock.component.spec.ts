import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleDecoracionesStockComponent } from './waffle-decoracion-stock.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { WaffleCanastaStockService } from 'src/app/services/stock/waffle-canasta-stock.service';

describe('WaffleDecoracionesStockComponent', () => {
  let component: WaffleDecoracionesStockComponent;
  let fixture: ComponentFixture<WaffleDecoracionesStockComponent>;
  let waffleCanastaStockService: jasmine.SpyObj<WaffleCanastaStockService>
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockdecoraciones = [{ decoracion: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ decoracion: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockdecoracionesExistencia = [{ decoracion: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ decoracion: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockdecoracionesInventario = [{ decoracion: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ decoracion: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let decoracionesStockServiceMock = {
    getdecoraciones: jasmine.createSpy('getDecoraciones').and.returnValue(of(mockdecoraciones)),
    updateStockdecoracion: jasmine.createSpy('updateStockDecoracion').and.returnValue(of(mockdecoracionesExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    waffleCanastaStockService = jasmine.createSpyObj('WaffleCanastaStockService', ['getDecoraciones', 'updateStockDecoracion']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ WaffleDecoracionesStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: WaffleCanastaStockService, useValue: decoracionesStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    decoracionesStockServiceMock.getdecoraciones.and.returnValue(of(mockdecoraciones))
    fixture = TestBed.createComponent(WaffleDecoracionesStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    decoracionesStockServiceMock.getdecoraciones.and.returnValue(of(mockdecoraciones))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.decoraciones).toEqual(mockdecoraciones)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    decoracionesStockServiceMock.getdecoraciones.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockdecoracionesExistencia[1], mockdecoracionesExistencia[1].id)
    expect(decoracionesStockServiceMock.updateStockdecoracion).toHaveBeenCalledWith(mockdecoracionesExistencia[1].id,{existencia: mockdecoracionesExistencia[1].existencia, cantidad: mockdecoracionesExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await decoracionesStockServiceMock.updateStockdecoracion.and.returnValue(of(mockSucursalId))
     expect(decoracionesStockServiceMock.getdecoraciones).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockdecoracionesExistencia[1], mockdecoracionesExistencia[1].id)
    expect(decoracionesStockServiceMock.updateStockdecoracion).toHaveBeenCalledWith(mockdecoracionesExistencia[1].id,{existencia: mockdecoracionesExistencia[1].existencia, cantidad: mockdecoracionesExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await decoracionesStockServiceMock.updateStockdecoracion.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockdecoracionesExistencia[1], mockdecoracionesExistencia[1].id)
    expect(decoracionesStockServiceMock.updateStockdecoracion).toHaveBeenCalledWith(mockdecoracionesExistencia[1].id,{existencia: mockdecoracionesExistencia[1].existencia, cantidad: mockdecoracionesExistencia[1].cantidad, sucursal_id: component.bebida1.sucursal_id});
    await decoracionesStockServiceMock.updateStockdecoracion.and.returnValue(of(mockSucursalId))
     expect(decoracionesStockServiceMock.getdecoraciones).toHaveBeenCalledWith(component.bebida1)
     decoracionesStockServiceMock.getdecoraciones.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockdecoracionesInventario[0], mockdecoracionesInventario[0].id)
    expect(decoracionesStockServiceMock.updateStockdecoracion).toHaveBeenCalledWith(mockdecoracionesInventario[0].id,{existencia: mockdecoracionesInventario[0].existencia, cantidad: mockdecoracionesInventario[0].cantidad, inventario: mockdecoracionesInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
    await decoracionesStockServiceMock.updateStockdecoracion.and.returnValue(of(mockSucursalId))
     expect(decoracionesStockServiceMock.getdecoraciones).toHaveBeenCalledWith(component.bebida1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockdecoracionesInventario[0], mockdecoracionesInventario[0].id)
    expect(decoracionesStockServiceMock.updateStockdecoracion).toHaveBeenCalledWith(mockdecoracionesInventario[0].id,{existencia: mockdecoracionesInventario[0].existencia, cantidad: mockdecoracionesInventario[0].cantidad, inventario: mockdecoracionesInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     decoracionesStockServiceMock.updateStockdecoracion.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.bebida1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockdecoracionesInventario[0], mockdecoracionesInventario[0].id)
    expect(decoracionesStockServiceMock.updateStockdecoracion).toHaveBeenCalledWith(mockdecoracionesInventario[0].id,{existencia: mockdecoracionesInventario[0].existencia, cantidad: mockdecoracionesInventario[0].cantidad, inventario: mockdecoracionesInventario[0].inventario, sucursal_id: component.bebida1.sucursal_id});
     decoracionesStockServiceMock.updateStockdecoracion.and.returnValue(of(mockSucursalId))
     expect(decoracionesStockServiceMock.getdecoraciones).toHaveBeenCalledWith(component.bebida1)
     decoracionesStockServiceMock.getdecoraciones.and.returnValue(throwError({ error: { message: 'Token expired' } }));
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

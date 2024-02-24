import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaEnsaladaIndividualStockComponent } from './crepa-salada-ensalada-individual-stock.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { IdService } from 'src/app/services/id.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';


describe('ensaladasCalientesStockComponent', () => {
  let component: CrepaSaladaEnsaladaIndividualStockComponent;
  let fixture: ComponentFixture<CrepaSaladaEnsaladaIndividualStockComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaSaladaStockService: jasmine.SpyObj<CrepaSaladaStockService>;
  let idService: jasmine.SpyObj<IdService>;
  const mockensaladas = [{ ensalada_ind: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ ensalada_ind: 'te', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockensaladasExistencia = [{ ensalada_ind: 'Café', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ ensalada_ind: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockensaladasInventario = [{ ensalada_ind: 'Café', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ ensalada_ind: 'te', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let ensaladasStockServiceMock = {
    getEnsaladasIndividuales: jasmine.createSpy('getEnsaladasIndividuales').and.returnValue(of(mockensaladas)),
    updateStockEnsaladaIndividual: jasmine.createSpy('updateStockEnsaladaIndividual').and.returnValue(of(mockensaladasExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaStockService = jasmine.createSpyObj('ensaladasCalientesService', ['getEnsaladasIndividuales', 'updateStockEnsaladaIndividual']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaSaladaEnsaladaIndividualStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaStockService, useValue: ensaladasStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    ensaladasStockServiceMock.getEnsaladasIndividuales.and.returnValue(of(mockensaladas))
    fixture = TestBed.createComponent(CrepaSaladaEnsaladaIndividualStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    ensaladasStockServiceMock.getEnsaladasIndividuales.and.returnValue(of(mockensaladas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.ensaladas).toEqual(mockensaladas)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    ensaladasStockServiceMock.getEnsaladasIndividuales.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.ensalada1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockensaladasExistencia[1], mockensaladasExistencia[1].id)
    expect(ensaladasStockServiceMock.updateStockEnsaladaIndividual).toHaveBeenCalledWith(mockensaladasExistencia[1].id,{existencia: mockensaladasExistencia[1].existencia, cantidad: mockensaladasExistencia[1].cantidad, sucursal_id: component.ensalada1.sucursal_id});
    await ensaladasStockServiceMock.updateStockEnsaladaIndividual.and.returnValue(of(mockSucursalId))
     expect(ensaladasStockServiceMock.getEnsaladasIndividuales).toHaveBeenCalledWith(component.ensalada1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.ensalada1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockensaladasExistencia[1], mockensaladasExistencia[1].id)
    expect(ensaladasStockServiceMock.updateStockEnsaladaIndividual).toHaveBeenCalledWith(mockensaladasExistencia[1].id,{existencia: mockensaladasExistencia[1].existencia, cantidad: mockensaladasExistencia[1].cantidad, sucursal_id: component.ensalada1.sucursal_id});
    ensaladasStockServiceMock.updateStockEnsaladaIndividual.and.returnValue(of(mockSucursalId))
    expect(ensaladasStockServiceMock.getEnsaladasIndividuales).toHaveBeenCalledWith(component.ensalada1)
    await ensaladasStockServiceMock.getEnsaladasIndividuales.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.ensalada1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockensaladasExistencia[1], mockensaladasExistencia[1].id)
    expect(ensaladasStockServiceMock.updateStockEnsaladaIndividual).toHaveBeenCalledWith(mockensaladasExistencia[1].id,{existencia: mockensaladasExistencia[1].existencia, cantidad: mockensaladasExistencia[1].cantidad, sucursal_id: component.ensalada1.sucursal_id});
    await ensaladasStockServiceMock.updateStockEnsaladaIndividual.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.ensalada1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockensaladasInventario[0], mockensaladasInventario[0].id)
    expect(ensaladasStockServiceMock.updateStockEnsaladaIndividual).toHaveBeenCalledWith(mockensaladasInventario[0].id,{existencia: mockensaladasInventario[0].existencia, cantidad: mockensaladasInventario[0].cantidad, inventario: mockensaladasInventario[0].inventario, sucursal_id: component.ensalada1.sucursal_id});
    await ensaladasStockServiceMock.updateStockEnsaladaIndividual.and.returnValue(of(mockSucursalId))
     expect(ensaladasStockServiceMock.getEnsaladasIndividuales).toHaveBeenCalledWith(component.ensalada1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.ensalada1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockensaladasInventario[0], mockensaladasInventario[0].id)
    expect(ensaladasStockServiceMock.updateStockEnsaladaIndividual).toHaveBeenCalledWith(mockensaladasInventario[0].id,{existencia: mockensaladasInventario[0].existencia, cantidad: mockensaladasInventario[0].cantidad, inventario: mockensaladasInventario[0].inventario, sucursal_id: component.ensalada1.sucursal_id});
     ensaladasStockServiceMock.updateStockEnsaladaIndividual.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.ensalada1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockensaladasInventario[0], mockensaladasInventario[0].id)
    expect(ensaladasStockServiceMock.updateStockEnsaladaIndividual).toHaveBeenCalledWith(mockensaladasInventario[0].id,{existencia: mockensaladasInventario[0].existencia, cantidad: mockensaladasInventario[0].cantidad, inventario: mockensaladasInventario[0].inventario, sucursal_id: component.ensalada1.sucursal_id});
     ensaladasStockServiceMock.updateStockEnsaladaIndividual.and.returnValue(of(mockSucursalId))
     expect(ensaladasStockServiceMock.getEnsaladasIndividuales).toHaveBeenCalledWith(component.ensalada1)
     await ensaladasStockServiceMock.getEnsaladasIndividuales.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

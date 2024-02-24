import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaBotanaStockComponent } from './crepa-salada-botana-stock.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { of, throwError } from 'rxjs';
import { IdService } from 'src/app/services/id.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrepaSaladaStockService } from 'src/app/services/stock/crepa-salada-stock.service';

describe('botanasCalientesStockComponent', () => {
  let component: CrepaSaladaBotanaStockComponent;
  let fixture: ComponentFixture<CrepaSaladaBotanaStockComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let botanasStockService: jasmine.SpyObj<CrepaSaladaStockService>;
  let idService: jasmine.SpyObj<IdService>;
  const mockbotanas = [{ botana: 'Café', descripcion: 'asdadasd', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ botana: 'te', descripcion: 'asdadasd', existencia: '0', inventario: 0, id: '4', cantidad: 0} ];
  const mockbotanasExistencia = [{ botana: 'Café', descripcion: 'asdadasd', existencia: '1', inventario: 10, id: '2', cantidad:  1},{ botana: 'te', descripcion: 'asdadasd', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  const mockbotanasInventario = [{ botana: 'Café', descripcion: 'asdadasd', existencia: '1', inventario: 7, id: '2', cantidad:  1},{ botana: 'te', descripcion: 'asdadasd', existencia: '1', inventario: 0, id: '4', cantidad: 0} ];
  let botanasStockServiceMock = {
    getBotanas: jasmine.createSpy('getbotanasCalientes').and.returnValue(of(mockbotanas)),
    updateStockBotana: jasmine.createSpy('updateStockBotana').and.returnValue(of(mockbotanasExistencia))
  }

  const mockSucursalId = 1;
  let sucursalIdServiceMock = {
    getId: jasmine.createSpy('getId').and.returnValue(of(mockSucursalId))
  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    botanasStockService = jasmine.createSpyObj('botanasCalientesService', ['getbotanasCalientes', 'updateStockBotana']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaSaladaBotanaStockComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaStockService, useValue: botanasStockServiceMock}
      ]
    })
    .compileComponents();
    sucursalIdServiceMock.getId.and.returnValue(of(mockSucursalId))
    botanasStockServiceMock.getBotanas.and.returnValue(of(mockbotanas))
    fixture = TestBed.createComponent(CrepaSaladaBotanaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drinks', async () => {
    botanasStockServiceMock.getBotanas.and.returnValue(of(mockbotanas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(component.botanas).toEqual(mockbotanas)
  });

  it('should show alert and navigate to admin when token expired error occurs', async () => {
    botanasStockServiceMock.getBotanas.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should update the existence', async () => {
    component.botana1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockbotanasExistencia[1], mockbotanasExistencia[1].id)
    expect(botanasStockServiceMock.updateStockBotana).toHaveBeenCalledWith(mockbotanasExistencia[1].id,{existencia: mockbotanasExistencia[1].existencia, cantidad: mockbotanasExistencia[1].cantidad, sucursal_id: component.botana1.sucursal_id});
    await botanasStockServiceMock.updateStockBotana.and.returnValue(of(mockSucursalId))
     expect(botanasStockServiceMock.getBotanas).toHaveBeenCalledWith(component.botana1)
  });

  it('should update the existence (error token expired 1)', async () => {
    component.botana1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockbotanasExistencia[1], mockbotanasExistencia[1].id)
    expect(botanasStockServiceMock.updateStockBotana).toHaveBeenCalledWith(mockbotanasExistencia[1].id,{existencia: mockbotanasExistencia[1].existencia, cantidad: mockbotanasExistencia[1].cantidad, sucursal_id: component.botana1.sucursal_id});
    botanasStockServiceMock.updateStockBotana.and.returnValue(of(mockSucursalId))
    expect(botanasStockServiceMock.getBotanas).toHaveBeenCalledWith(component.botana1)
    await botanasStockServiceMock.getBotanas.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the existence (error token expired)', async () => {
    component.botana1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizarExistencia(mockbotanasExistencia[1], mockbotanasExistencia[1].id)
    expect(botanasStockServiceMock.updateStockBotana).toHaveBeenCalledWith(mockbotanasExistencia[1].id,{existencia: mockbotanasExistencia[1].existencia, cantidad: mockbotanasExistencia[1].cantidad, sucursal_id: component.botana1.sucursal_id});
    await botanasStockServiceMock.updateStockBotana.and.returnValue(throwError({ error: { message: 'Token expired' } }))
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory', async () => {
    component.botana1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockbotanasInventario[0], mockbotanasInventario[0].id)
    expect(botanasStockServiceMock.updateStockBotana).toHaveBeenCalledWith(mockbotanasInventario[0].id,{existencia: mockbotanasInventario[0].existencia, cantidad: mockbotanasInventario[0].cantidad, inventario: mockbotanasInventario[0].inventario, sucursal_id: component.botana1.sucursal_id});
    await botanasStockServiceMock.updateStockBotana.and.returnValue(of(mockSucursalId))
     expect(botanasStockServiceMock.getBotanas).toHaveBeenCalledWith(component.botana1)
  });

  it('should update the inventory (error token expired 1)', async () => {
    component.botana1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockbotanasInventario[0], mockbotanasInventario[0].id)
    expect(botanasStockServiceMock.updateStockBotana).toHaveBeenCalledWith(mockbotanasInventario[0].id,{existencia: mockbotanasInventario[0].existencia, cantidad: mockbotanasInventario[0].cantidad, inventario: mockbotanasInventario[0].inventario, sucursal_id: component.botana1.sucursal_id});
     botanasStockServiceMock.updateStockBotana.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });

  it('should update the inventory (error token expired)', async () => {
    component.botana1.sucursal_id = 1
    component.sucursal_id = 1
    component.actualizaInventario(mockbotanasInventario[0], mockbotanasInventario[0].id)
    expect(botanasStockServiceMock.updateStockBotana).toHaveBeenCalledWith(mockbotanasInventario[0].id,{existencia: mockbotanasInventario[0].existencia, cantidad: mockbotanasInventario[0].cantidad, inventario: mockbotanasInventario[0].inventario, sucursal_id: component.botana1.sucursal_id});
     botanasStockServiceMock.updateStockBotana.and.returnValue(of(mockSucursalId))
     expect(botanasStockServiceMock.getBotanas).toHaveBeenCalledWith(component.botana1)
     await botanasStockServiceMock.getBotanas.and.returnValue(throwError({ error: { message: 'Token expired' } }))
     setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
    }, 400)
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaAderesoBaseVentasComponent } from './crepa-salada-adereso-base-ventas.component';
import { of, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CrepaDulceSalesService } from 'src/app/services/sales/crepa-dulce-sales.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaSalesService } from 'src/app/services/sales/crepa-salada-sales.service';

describe('CrepaSaladaAderesoBaseVentasComponent', () => {
  let component: CrepaSaladaAderesoBaseVentasComponent;
  let fixture: ComponentFixture<CrepaSaladaAderesoBaseVentasComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaSaladaSalesService: jasmine.SpyObj<CrepaSaladaSalesService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockadereso_baseSales = [
    {
      adereso_base: "Café Americano",
      product_id: 1,
      sucursal_id: 1,
      factura_id: 1234,
      ventas: 10,
      created_at: "2024-02-02T09:00:00.000Z",
    },
    {
      adereso_base: "Té Verde",
      product_id: 2,
      sucursal_id: 2,
      factura_id: 1235,
      ventas: 5,
      created_at: "2024-02-02T10:30:00.000Z",
    },
    {
      adereso_base: "Chocolate Caliente",
      product_id: 3,
      sucursal_id: 1,
      factura_id: 1236,
      ventas: 8,
      created_at: "2024-02-02T12:00:00.000Z",
    },
    {
      adereso_base: "Leche de Almendras",
      product_id: 4,
      sucursal_id: 2,
      factura_id: 1237,
      ventas: 3,
      created_at: "2024-02-02T13:30:00.000Z",
    },
    {
      adereso_base: "Jugo de Naranja",
      product_id: 5,
      sucursal_id: 1,
      factura_id: 1238,
      ventas: 12,
      created_at: "2024-02-02T15:00:00.000Z",
    },
    {
      adereso_base: "Batido de Fresa",
      product_id: 6,
      sucursal_id: 2,
      factura_id: 1239,
      ventas: 6,
      created_at: "2024-02-02T16:30:00.000Z",
    },
    {
      adereso_base: "Agua Mineral",
      product_id: 7,
      sucursal_id: 1,
      factura_id: 1240,
      ventas: 15,
      created_at: "2024-02-02T18:00:00.000Z",
    },
    {
      adereso_base: "Refresco de Cola",
      product_id: 8,
      sucursal_id: 2,
      factura_id: 1241,
      ventas: 9,
      created_at: "2024-02-02T19:30:00.000Z",
    },
    {
      adereso_base: "Cerveza",
      product_id: 9,
      sucursal_id: 1,
      factura_id: 1242,
      ventas: 7,
      created_at: "2024-02-02T21:00:00.000Z",
    },
    {
      adereso_base: "Vino Tinto",
      product_id: 10,
      sucursal_id: 2,
      factura_id: 1243,
      ventas: 4,
      created_at: "2024-02-02T22:30:00.000Z",
    },
  ];

  const mockadereso_baseSalesLaps = [
    // ... Bebidas del primer set (10) ...
  
    {
      adereso_base: "Té de Manzanilla",
      product_id: 11,
      sucursal_id: 1,
      factura_id: 1244,
      ventas: 2,
      created_at: "2024-01-24T10:00:00.000Z",
    },
    {
      adereso_base: "Leche de Coco",
      product_id: 12,
      sucursal_id: 2,
      factura_id: 1245,
      ventas: 4,
      created_at: "2024-01-23T12:30:00.000Z",
    },
    {
      adereso_base: "Smoothie de Frutas",
      product_id: 13,
      sucursal_id: 1,
      factura_id: 1246,
      ventas: 8,
      created_at: "2024-01-22T14:30:00.000Z",
    },
    {
      adereso_base: "Cacao Caliente",
      product_id: 14,
      sucursal_id: 2,
      factura_id: 1247,
      ventas: 5,
      created_at: "2024-01-21T16:00:00.000Z",
    },
    {
      adereso_base: "Café con Leche",
      product_id: 15,
      sucursal_id: 1,
      factura_id: 1248,
      ventas: 10,
      created_at: "2024-01-20T18:00:00.000Z",
    },
    {
      adereso_base: "Té Chai",
      product_id: 16,
      sucursal_id: 2,
      factura_id: 1249,
      ventas: 3,
      created_at: "2024-01-19T20:00:00.000Z",
    },
    {
      adereso_base: "Mate",
      product_id: 17,
      sucursal_id: 1,
      factura_id: 1250,
      ventas: 7,
      created_at: "2024-01-18T22:00:00.000Z",
    },
  ];

  let adereso_baseSalesServiceMock = {
    getAderesosBase: jasmine.createSpy('getAderesosBase').and.returnValue(of(mockadereso_baseSales)),
    lapsSalesAderesoBase: jasmine.createSpy('lapsSalesAderesoBase').and.returnValue(of(mockadereso_baseSalesLaps))
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaSalesService = jasmine.createSpyObj('CrepaSaladaSalesService', ['getAderesosBase', 'lapsSalesAderesoBase']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaSaladaAderesoBaseVentasComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaSalesService, useValue: adereso_baseSalesServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaAderesoBaseVentasComponent);
    component = fixture.componentInstance;
    component.sucursal_id = 1;
    component.adereso1.sucursal_id = 1;
    component.adereso1.fecha = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give the formatted date', async () => {
    component.adereso1.fecha = new Date()
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    const date1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    
    component.ngOnInit();
    await fixture.whenStable();
    expect(adereso_baseSalesServiceMock.getAderesosBase).toHaveBeenCalledWith({fecha:date1, sucursal_id: 1})

    adereso_baseSalesServiceMock.getAderesosBase.and.returnValue(of(mockadereso_baseSales))
  });

  it('should generate sales', async () => {

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    const date1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    component.fecha.fecha1 = '2023-02-01'
    component.fecha.fecha2 = '2023-02-06'

    const año = component.fecha.fecha1.substr(0, 4);
    const mes = component.fecha.fecha1.substr(5, 2);
    const dia = component.fecha.fecha1.substr(8, 2);
    const fecha1 = `${año}-${mes}-${dia}`
    const año1 = component.fecha.fecha2.substr(0, 4);
    const mes1 = component.fecha.fecha2.substr(5, 2);
    const dia1 = component.fecha.fecha2.substr(8, 2);
    const fecha2 = `${año1}-${mes1}-${dia1}`
    const fecha = {
      fecha1: fecha1,
      fecha2: fecha2
    }

    const adereso1:any = {}

    adereso1.fechaInicio = fecha.fecha1;
    adereso1.fechaFin = fecha.fecha2;
    adereso1.sucursal_id = 1;
    adereso1.fecha = date1

    
    component.genarar();
    await fixture.whenStable();
    expect(adereso_baseSalesServiceMock.lapsSalesAderesoBase).toHaveBeenCalledWith(adereso1)

    adereso_baseSalesServiceMock.lapsSalesAderesoBase.and.returnValue(of(mockadereso_baseSalesLaps))
  });
  

  it('should show an alert asking for the dates', async () => {
    AuthServicMock.lang.and.returnValue('en')
    component.fecha.fecha1 = ''
    component.fecha.fecha2 = ''
    component.genarar();
    await fixture.whenStable();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Select the dates');

  });

  it('debería mostrar una alerta preguntando por las fechas', async () => {
    AuthServicMock.lang.and.returnValue('es')
    component.fecha.fecha1 = ''
    component.fecha.fecha2 = ''
    component.genarar();
    await fixture.whenStable();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Selecciona las fechas');

  });


  it('should show alert and navigate to admin when token expired error occurs', async () => {
    AuthServicMock.lang.and.returnValue('en')
    component.adereso1.fecha = new Date()
    adereso_baseSalesServiceMock.getAderesosBase.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    component.adereso1.fecha = new Date()
    adereso_baseSalesServiceMock.getAderesosBase.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });
});

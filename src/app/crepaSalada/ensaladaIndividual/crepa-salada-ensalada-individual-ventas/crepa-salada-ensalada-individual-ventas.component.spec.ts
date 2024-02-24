import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaEnsaladaIndividualVentasComponent } from './crepa-salada-ensalada-individual-ventas.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { CrepaSaladaSalesService } from 'src/app/services/sales/crepa-salada-sales.service';

describe('CrepaSaladaEnsaladaIndividualVentasComponent', () => {
  let component: CrepaSaladaEnsaladaIndividualVentasComponent;
  let fixture: ComponentFixture<CrepaSaladaEnsaladaIndividualVentasComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  let crepaSaladaSalesService: jasmine.SpyObj<CrepaSaladaSalesService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockEnsaladasSales = [
    {
      ensalada_ind: "Café Americano",
      descripcion: "Café negro con agua caliente.",
      product_id: 1,
      sucursal_id: 1,
      factura_id: 1234,
      ventas: 10,
      created_at: "2024-02-02T09:00:00.000Z",
    },
    {
      ensalada_ind: "Té Verde",
      descripcion: "Té verde natural sin azúcar.",
      product_id: 2,
      sucursal_id: 2,
      factura_id: 1235,
      ventas: 5,
      created_at: "2024-02-02T10:30:00.000Z",
    },
    {
      ensalada_ind: "Chocolate Caliente",
      descripcion: "ensalada_ind caliente a base de chocolate.",
      product_id: 3,
      sucursal_id: 1,
      factura_id: 1236,
      ventas: 8,
      created_at: "2024-02-02T12:00:00.000Z",
    },
    {
      ensalada_ind: "Leche de Almendras",
      descripcion: "ensalada_ind vegetal a base de almendras.",
      product_id: 4,
      sucursal_id: 2,
      factura_id: 1237,
      ventas: 3,
      created_at: "2024-02-02T13:30:00.000Z",
    },
    {
      ensalada_ind: "Jugo de Naranja",
      descripcion: "Jugo natural de naranja fresca.",
      product_id: 5,
      sucursal_id: 1,
      factura_id: 1238,
      ventas: 12,
      created_at: "2024-02-02T15:00:00.000Z",
    },
    {
      ensalada_ind: "Batido de Fresa",
      descripcion: "Batido de fresa natural con leche.",
      product_id: 6,
      sucursal_id: 2,
      factura_id: 1239,
      ventas: 6,
      created_at: "2024-02-02T16:30:00.000Z",
    },
    {
      ensalada_ind: "Agua Mineral",
      descripcion: "Agua mineral natural sin gas.",
      product_id: 7,
      sucursal_id: 1,
      factura_id: 1240,
      ventas: 15,
      created_at: "2024-02-02T18:00:00.000Z",
    },
    {
      ensalada_ind: "Refresco de Cola",
      descripcion: "Refresco de cola con gas.",
      product_id: 8,
      sucursal_id: 2,
      factura_id: 1241,
      ventas: 9,
      created_at: "2024-02-02T19:30:00.000Z",
    },
    {
      ensalada_ind: "Cerveza",
      descripcion: "Cerveza lager con alcohol.",
      product_id: 9,
      sucursal_id: 1,
      factura_id: 1242,
      ventas: 7,
      created_at: "2024-02-02T21:00:00.000Z",
    },
    {
      ensalada_ind: "Vino Tinto",
      descripcion: "Vino tinto de uva tempranillo.",
      product_id: 10,
      sucursal_id: 2,
      factura_id: 1243,
      ventas: 4,
      created_at: "2024-02-02T22:30:00.000Z",
    },
  ];

  const mockEnsaladasSalesLaps = [
    // ... ensaladas del primer set (10) ...
  
    {
      ensalada_ind: "Té de Manzanilla",
      descripcion: "Té de manzanilla natural sin azúcar.",
      product_id: 11,
      sucursal_id: 1,
      factura_id: 1244,
      ventas: 2,
      created_at: "2024-01-24T10:00:00.000Z",
    },
    {
      ensalada_ind: "Leche de Coco",
      descripcion: "ensalada_ind vegetal a base de coco.",
      product_id: 12,
      sucursal_id: 2,
      factura_id: 1245,
      ventas: 4,
      created_at: "2024-01-23T12:30:00.000Z",
    },
    {
      ensalada_ind: "Smoothie de Frutas",
      descripcion: "Batido de frutas tropicales con leche.",
      product_id: 13,
      sucursal_id: 1,
      factura_id: 1246,
      ventas: 8,
      created_at: "2024-01-22T14:30:00.000Z",
    },
    {
      ensalada_ind: "Cacao Caliente",
      descripcion: "ensalada_ind caliente a base de cacao puro.",
      product_id: 14,
      sucursal_id: 2,
      factura_id: 1247,
      ventas: 5,
      created_at: "2024-01-21T16:00:00.000Z",
    },
    {
      ensalada_ind: "Café con Leche",
      descripcion: "Café negro con leche caliente.",
      product_id: 15,
      sucursal_id: 1,
      factura_id: 1248,
      ventas: 10,
      created_at: "2024-01-20T18:00:00.000Z",
    },
    {
      ensalada_ind: "Té Chai",
      descripcion: "Té negro con especias aromáticas.",
      product_id: 16,
      sucursal_id: 2,
      factura_id: 1249,
      ventas: 3,
      created_at: "2024-01-19T20:00:00.000Z",
    },
    {
      ensalada_ind: "Mate",
      descripcion: "Infusion de yerba mate tradicional.",
      product_id: 17,
      sucursal_id: 1,
      factura_id: 1250,
      ventas: 7,
      created_at: "2024-01-18T22:00:00.000Z",
    },
  ];

  let EnsaladasServiceMock = {
    getEnsaladasIndividual: jasmine.createSpy('getEnsaladasIndividual').and.returnValue(of(mockEnsaladasSales)),
    lapsSalesEnsaladaIndividual: jasmine.createSpy('updateStockensaladaCaliente').and.returnValue(of(mockEnsaladasSalesLaps))
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang()').and.returnValue('es'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    crepaSaladaSalesService = jasmine.createSpyObj('CrepaSaladaSalesService', ['getEnsaladasIndividual']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ CrepaSaladaEnsaladaIndividualVentasComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaSaladaSalesService, useValue: EnsaladasServiceMock},
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaEnsaladaIndividualVentasComponent);
    component = fixture.componentInstance;
    component.sucursal_id = 1;
    component.ensalada1.sucursal_id = 1;
    component.ensalada1.fecha = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give the formatted date', async () => {
    component.ensalada1.fecha = new Date()
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    const date1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    
    component.ngOnInit();
    await fixture.whenStable();
    expect(EnsaladasServiceMock.getEnsaladasIndividual).toHaveBeenCalledWith({fecha:date1, sucursal_id: 1})

    EnsaladasServiceMock.getEnsaladasIndividual.and.returnValue(of(mockEnsaladasSales))
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

    const ensalada1:any = {}

    ensalada1.fechaInicio = fecha.fecha1;
    ensalada1.fechaFin = fecha.fecha2;
    ensalada1.sucursal_id = 1;
    ensalada1.fecha = date1

    
    component.genarar();
    await fixture.whenStable();
    expect(EnsaladasServiceMock.lapsSalesEnsaladaIndividual).toHaveBeenCalledWith(ensalada1)

    EnsaladasServiceMock.lapsSalesEnsaladaIndividual.and.returnValue(of(mockEnsaladasSalesLaps))
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
    component.ensalada1.fecha = new Date()
    EnsaladasServiceMock.getEnsaladasIndividual.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    component.ensalada1.fecha = new Date()
    EnsaladasServiceMock.getEnsaladasIndividual.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });
  
});



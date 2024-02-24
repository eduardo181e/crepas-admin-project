import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasComponent } from './facturas.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { of, throwError } from 'rxjs';
import { FacturasService } from 'src/app/services/factura/facturas.service';

describe('FacturasComponent', () => {
  let component: FacturasComponent;
  let fixture: ComponentFixture<FacturasComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const pruebas = [
    {
      id: 12345,
      numero_caja: 2,
      numero_productos: 5,
      sucursal_id: 7,
      userId: 10,
      total: 250.99,
      fecha_hora: "2024-01-19T20:00:00.000Z", // Ejemplo usando la fecha y hora actual
    },
    {
      id: 54321,
      numero_caja: 1,
      numero_productos: 10,
      sucursal_id: 3,
      userId: 15,
      total: 499.50,
      fecha_hora: "2024-01-19T20:00:00.000Z", // Ejemplo con otra fecha y hora
    },
    {
      id: 98765,
      numero_caja: 3,
      numero_productos: 3,
      sucursal_id: 5,
      userId: 8,
      total: 120.75,
      fecha_hora: "2024-01-19T20:00:00.000Z", // Ejemplo con otra fecha y hora
    },
    {
      id: 30126,
      numero_caja: 4,
      numero_productos: 7,
      sucursal_id: 2,
      userId: 20,
      total: 378.00,
      fecha_hora: "2024-01-19T20:00:00.000Z", // Ejemplo con otra fecha y hora
    },
  ];
  
  let AuthServicMock = {
    lang: jasmine.createSpy('lang()').and.returnValue('es'),
  }

  let FacturasServiceMock = {
    allInvoices: jasmine.createSpy('allInvoices').and.returnValue(of(pruebas)),
    lapsAllInvoices: jasmine.createSpy('updateStockBebidaCaliente').and.returnValue(of(pruebas))

  }
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ FacturasComponent, TranslatePipe ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: FacturasService, useValue: FacturasServiceMock },
        { provide: AuthService, useValue: AuthServicMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasComponent);
    component = fixture.componentInstance;
    component.bebida1.fecha = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the invoices', async () => {
    component.bebida1.fecha = new Date()
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    const date1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    FacturasServiceMock.allInvoices.and.returnValue(of(pruebas))
    component.ngOnInit()
    await fixture.whenStable();
    expect(FacturasServiceMock.allInvoices).toHaveBeenCalledWith({fecha: date1})
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

    const bebida1:any = {}

    bebida1.fechaInicio = fecha.fecha1;
    bebida1.fechaFin = fecha.fecha2;
    bebida1.fecha = date1

    
    component.genarar();
    await fixture.whenStable();
    expect(FacturasServiceMock.lapsAllInvoices).toHaveBeenCalledWith(bebida1)

    FacturasServiceMock.lapsAllInvoices.and.returnValue(of(pruebas))
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
    component.bebida1.fecha = new Date()
    FacturasServiceMock.allInvoices.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Your session has expired, please log in again');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('debería mostrar una alerta y navegar hasta el administrador cuando se produzca un error de caducidad del token', async () => {
    AuthServicMock.lang.and.returnValue('es')
    component.bebida1.fecha = new Date()
    FacturasServiceMock.allInvoices.and.returnValue(throwError({ error: { message: 'Token expired' } }));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Tu sesión ha expirado, inicia sesión nuevamente');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate view user', () => {
  component.viewUsuario(4);
  expect(mockRouter.navigate).toHaveBeenCalledWith(['/viewUsuarioCaja/' + 4]);
  });

  it('should navigate facturas', () => {
    component.viewFactura(4);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/viewFactura/' + 4]);
    });


});

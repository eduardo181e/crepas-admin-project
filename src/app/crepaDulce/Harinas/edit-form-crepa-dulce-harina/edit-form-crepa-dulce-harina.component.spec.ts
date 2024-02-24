import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCrepaDulceHarinaComponent } from './edit-form-crepa-dulce-harina.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from 'src/app/translate/translate.pipe';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { of } from 'rxjs';

describe('EditFormCrepaDulceHarinaComponent', () => {
  let component: EditFormCrepaDulceHarinaComponent;
  let fixture: ComponentFixture<EditFormCrepaDulceHarinaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let HarinasServiceMock = {
    getHarina: jasmine.createSpy('getBebida').and.returnValue(of([{harina: 'vainilla', inventario: '1', id: 1}])),
    updateHarina: jasmine.createSpy('updateHarina').and.returnValue(of()),
  }
  let AuthServicMock = {
    lang: jasmine.createSpy('lang').and.returnValue('en'),
  }
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule],
      declarations: [ EditFormCrepaDulceHarinaComponent, TranslatePipe ],
      providers: [ 
        
        { provide: AlertDialogService, useValue: alertService },
        { provide: Router, useValue: mockRouter },
        { provide: CrepaDulceService, useValue: HarinasServiceMock},
        { provide: AuthService, useValue: AuthServicMock},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 123,
              },
            },
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormCrepaDulceHarinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should return the drink that is going to be edited', () => {
    component.ngOnInit();
    expect(HarinasServiceMock.getHarina).toHaveBeenCalledWith(123)
    HarinasServiceMock.getHarina.and.returnValue(of([{harina: 'vainilla', inventario: '1', id: 1}]))
    setTimeout(() => { 
      expect(component.harina).toEqual({harina: 'vainilla', inventario: '1', id: 1})
    }, 400)
  });

  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = ''
    component.harina.inventario = ''
    component.updateHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter all the data');
  });

  it('should order the flour', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = ''
    component.harina.inventario = '1'
    component.updateHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter the name of the flour');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = ''
    component.updateHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Please enter an inventory');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('en')
    component.harina.id = 1
    component.harina.harina = 'Vainilla'
    component.harina.inventario = '1'
    const bebida = {
      id: 1,
      harina: 'Vainilla',
      inventario: '1'
    }
    component.updateHarina()
    expect(HarinasServiceMock.updateHarina).toHaveBeenCalledWith(bebida.id, bebida)
    HarinasServiceMock.updateHarina.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Flour saved correctly');
    }, 400)
    
  });

// Español
  it('should ask for all the data', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = ''
    component.harina.inventario = ''
    component.updateHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa todos los datos');
  });

  it('should order the flour', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = ''
    component.harina.inventario = '1'
    component.updateHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa el nombre de la harina');
  });

  it('should order the inventory', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.harina = 'Vainilla'
    component.harina.inventario = ''
    component.updateHarina();
    expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Por favor ingresa un inventario');
  });

  it('should send the data correctly', () => {
    AuthServicMock.lang.and.returnValue('es')
    component.harina.id = 1
    component.harina.harina = 'Vainilla'
    component.harina.inventario = '1'
    const bebida = {
      id: 1,
      harina: 'Vainilla',
      inventario: '1'
    }
    component.updateHarina()
    expect(HarinasServiceMock.updateHarina).toHaveBeenCalledWith(bebida.id, bebida)
    HarinasServiceMock.updateHarina.and.returnValue(of())
    setTimeout(() => {
      expect(alertService.mostrarAlerta).toHaveBeenCalledWith('Harina guardada correctamente');
    }, 400)
    
  });

});

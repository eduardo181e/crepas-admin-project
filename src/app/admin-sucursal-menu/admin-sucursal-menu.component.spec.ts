import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminSucursalMenuComponent } from './admin-sucursal-menu.component';
import { TranslatePipe } from '../translate/translate.pipe';

describe('AdminSucursalMenuComponent', () => {
  let component: AdminSucursalMenuComponent;
  let fixture: ComponentFixture<AdminSucursalMenuComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [ AdminSucursalMenuComponent, TranslatePipe ],
      providers: [{ provide: Router, useValue: router },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSucursalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to stock', () => {
    component.navigateStock();
    expect(router.navigate).toHaveBeenCalledWith(['stock']);
  });

  it('should redirect to facturas', () => {
    component.navigateFacturas();
    expect(router.navigate).toHaveBeenCalledWith(['facturaSucursal']);
  });

  it('should redirect to sales', () => {
    component.navigateVentas();
    expect(router.navigate).toHaveBeenCalledWith(['sales']);
  });
});

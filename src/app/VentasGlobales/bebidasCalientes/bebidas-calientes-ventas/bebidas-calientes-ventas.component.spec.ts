import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasCalientesVentasGlobalesComponent } from './bebidas-calientes-ventas.component';

describe('BebidasCalientesVentasGlobalesComponent', () => {
  let component: BebidasCalientesVentasGlobalesComponent;
  let fixture: ComponentFixture<BebidasCalientesVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebidasCalientesVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasCalientesVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

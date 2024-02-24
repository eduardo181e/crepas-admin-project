import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaIngredienteBaseVentasGlobalesComponent } from './crepa-salada-ingrediente-base-ventas.component';

describe('CrepaSaladaIngredienteBaseVentasGlobalesComponent', () => {
  let component: CrepaSaladaIngredienteBaseVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaSaladaIngredienteBaseVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaIngredienteBaseVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaIngredienteBaseVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

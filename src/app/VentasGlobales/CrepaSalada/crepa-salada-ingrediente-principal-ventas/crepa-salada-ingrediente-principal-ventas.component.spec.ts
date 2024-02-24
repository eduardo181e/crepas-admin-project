import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaIngredientePrincipalVentasGlobalesComponent } from './crepa-salada-ingrediente-principal-ventas.component';

describe('CrepaSaladaIngredientePrincipalVentasGlobalesComponent', () => {
  let component: CrepaSaladaIngredientePrincipalVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaSaladaIngredientePrincipalVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaIngredientePrincipalVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaIngredientePrincipalVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

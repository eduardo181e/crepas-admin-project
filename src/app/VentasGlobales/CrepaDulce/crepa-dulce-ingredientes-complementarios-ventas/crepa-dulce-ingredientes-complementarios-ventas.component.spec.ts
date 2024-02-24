import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceIngredientesComplementariosVentasGlobalesComponent } from './crepa-dulce-ingredientes-complementarios-ventas.component';

describe('CrepaDulceIngredientesComplementariosVentasGlobalesComponent', () => {
  let component: CrepaDulceIngredientesComplementariosVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaDulceIngredientesComplementariosVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaDulceIngredientesComplementariosVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceIngredientesComplementariosVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

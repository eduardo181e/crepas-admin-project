import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceIngredientesUntablesVentasGlobalesComponent } from './crepa-dulce-ingredientes-untables-ventas.component';

describe('CrepaDulceIngredientesUntablesVentasGlobalesComponent', () => {
  let component: CrepaDulceIngredientesUntablesVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaDulceIngredientesUntablesVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaDulceIngredientesUntablesVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceIngredientesUntablesVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleCanastaIngredienteUntableVentasGlobalesComponent } from './waffle-canasta-ingrediente-untable-ventas.component';

describe('WaffleCanastaIngredienteUntableVentasGlobalesComponent', () => {
  let component: WaffleCanastaIngredienteUntableVentasGlobalesComponent;
  let fixture: ComponentFixture<WaffleCanastaIngredienteUntableVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaffleCanastaIngredienteUntableVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaffleCanastaIngredienteUntableVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

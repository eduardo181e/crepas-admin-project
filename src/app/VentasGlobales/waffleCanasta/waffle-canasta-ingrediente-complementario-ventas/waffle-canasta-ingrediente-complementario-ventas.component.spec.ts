import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleCanastaIngredienteComplementarioVentasGlobalesComponent } from './waffle-canasta-ingrediente-complementario-ventas.component';

describe('WaffleCanastaIngredienteComplementarioVentasGlobalesComponent', () => {
  let component: WaffleCanastaIngredienteComplementarioVentasGlobalesComponent;
  let fixture: ComponentFixture<WaffleCanastaIngredienteComplementarioVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaffleCanastaIngredienteComplementarioVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaffleCanastaIngredienteComplementarioVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

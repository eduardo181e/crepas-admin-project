import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleCanastaDecoracionVentasGlobalesComponent } from './waffles-canasta-decoracion-ventas.component';

describe('WaffleCanastaDecoracionVentasGlobalesComponent', () => {
  let component: WaffleCanastaDecoracionVentasGlobalesComponent;
  let fixture: ComponentFixture<WaffleCanastaDecoracionVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaffleCanastaDecoracionVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaffleCanastaDecoracionVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceDecoracionVentasGlobalesComponent } from './crepa-dulce-decoracion-ventas.component';

describe('CrepaDulceDecoracionVentasGlobalesComponent', () => {
  let component: CrepaDulceDecoracionVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaDulceDecoracionVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaDulceDecoracionVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceDecoracionVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

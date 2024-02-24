import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceHarinasVentasGlobalesComponent } from './crepa-dulce-harinas-ventas.component';

describe('CrepaDulceHarinasVentasGlobalesComponent', () => {
  let component: CrepaDulceHarinasVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaDulceHarinasVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaDulceHarinasVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceHarinasVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

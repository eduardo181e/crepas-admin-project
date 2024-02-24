import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaDulceNieveVentasGlobalesComponent } from './crepa-dulce-nieve-ventas.component';

describe('CrepaDulceNieveVentasGlobalesComponent', () => {
  let component: CrepaDulceNieveVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaDulceNieveVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaDulceNieveVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaDulceNieveVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

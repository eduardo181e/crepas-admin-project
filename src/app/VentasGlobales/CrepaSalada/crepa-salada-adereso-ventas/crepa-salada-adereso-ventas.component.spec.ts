import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaAderesoVentasGlobalesComponent } from './crepa-salada-adereso-ventas.component';

describe('CrepaSaladaAderesoVentasGlobalesComponent', () => {
  let component: CrepaSaladaAderesoVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaSaladaAderesoVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaAderesoVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaAderesoVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaAderesoBaseVentasGlobalesComponent } from './crepa-salada-adereso-base-ventas.component';

describe('CrepaSaladaAderesoBaseVentasGlobalesComponent', () => {
  let component: CrepaSaladaAderesoBaseVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaSaladaAderesoBaseVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaAderesoBaseVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaAderesoBaseVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

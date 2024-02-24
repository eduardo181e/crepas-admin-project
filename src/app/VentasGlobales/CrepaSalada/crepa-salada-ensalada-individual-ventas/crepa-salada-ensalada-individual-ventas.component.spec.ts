import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaEnsaladaIndividualVentasGlobalesComponent } from './crepa-salada-ensalada-individual-ventas.component';

describe('CrepaSaladaEnsaladaIndividualVentasGlobalesComponent', () => {
  let component: CrepaSaladaEnsaladaIndividualVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaSaladaEnsaladaIndividualVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaEnsaladaIndividualVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaEnsaladaIndividualVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

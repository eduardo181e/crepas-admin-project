import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WafflesIngredienteComplementarioVentasGlobalesComponent } from './waffles-ingrediente-complementario-ventas.component';

describe('WafflesIngredienteComplementarioVentasGlobalesComponent', () => {
  let component: WafflesIngredienteComplementarioVentasGlobalesComponent;
  let fixture: ComponentFixture<WafflesIngredienteComplementarioVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WafflesIngredienteComplementarioVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WafflesIngredienteComplementarioVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

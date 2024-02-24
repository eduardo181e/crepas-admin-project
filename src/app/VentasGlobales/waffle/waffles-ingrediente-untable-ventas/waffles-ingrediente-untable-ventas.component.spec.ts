import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WafflesIngredienteUntableVentasGlobalesComponent } from './waffles-ingrediente-untable-ventas.component';

describe('WafflesIngredienteUntableVentasGlobalesComponent', () => {
  let component: WafflesIngredienteUntableVentasGlobalesComponent;
  let fixture: ComponentFixture<WafflesIngredienteUntableVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WafflesIngredienteUntableVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WafflesIngredienteUntableVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

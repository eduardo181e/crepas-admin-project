import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasFriasVentasGlobalesComponent } from './bebidas-frias-ventas.component';

describe('BebidasFriasVentasGlobalesComponent', () => {
  let component: BebidasFriasVentasGlobalesComponent;
  let fixture: ComponentFixture<BebidasFriasVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebidasFriasVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasFriasVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

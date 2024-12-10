import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleDecoracionVentasGlobalesComponent } from './waffles-decoracion-ventas.component';

describe('WaffleDecoracionVentasGlobalesComponent', () => {
  let component: WaffleDecoracionVentasGlobalesComponent;
  let fixture: ComponentFixture<WaffleDecoracionVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaffleDecoracionVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaffleDecoracionVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

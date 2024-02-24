import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleCanastaNievesVentasGlobalesComponent } from './waffle-canasta-nieves-ventas.component';

describe('WaffleCanastaNievesVentasGlobalesComponent', () => {
  let component: WaffleCanastaNievesVentasGlobalesComponent;
  let fixture: ComponentFixture<WaffleCanastaNievesVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaffleCanastaNievesVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaffleCanastaNievesVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

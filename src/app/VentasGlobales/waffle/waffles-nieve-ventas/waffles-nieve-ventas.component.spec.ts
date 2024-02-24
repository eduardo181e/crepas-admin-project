import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WafflesNieveVentasGlobalesComponent } from './waffles-nieve-ventas.component';

describe('WafflesNieveVentasGlobalesComponent', () => {
  let component: WafflesNieveVentasGlobalesComponent;
  let fixture: ComponentFixture<WafflesNieveVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WafflesNieveVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WafflesNieveVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

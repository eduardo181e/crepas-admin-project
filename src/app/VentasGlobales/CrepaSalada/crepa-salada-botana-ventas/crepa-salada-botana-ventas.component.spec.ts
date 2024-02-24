import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrepaSaladaBotanaVentasGlobalesComponent } from './crepa-salada-botana-ventas.component';

describe('CrepaSaladaBotanaVentasGlobalesComponent', () => {
  let component: CrepaSaladaBotanaVentasGlobalesComponent;
  let fixture: ComponentFixture<CrepaSaladaBotanaVentasGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrepaSaladaBotanaVentasGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrepaSaladaBotanaVentasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

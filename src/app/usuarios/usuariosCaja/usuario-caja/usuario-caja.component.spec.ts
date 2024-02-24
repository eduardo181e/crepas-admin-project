import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCajaComponent } from './usuario-caja.component';

describe('UsuarioCajaComponent', () => {
  let component: UsuarioCajaComponent;
  let fixture: ComponentFixture<UsuarioCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

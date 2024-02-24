import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormUsuarioCajaComponent } from './create-form-usuario-caja.component';

describe('CreateFormUsuarioCajaComponent', () => {
  let component: CreateFormUsuarioCajaComponent;
  let fixture: ComponentFixture<CreateFormUsuarioCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormUsuarioCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormUsuarioCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

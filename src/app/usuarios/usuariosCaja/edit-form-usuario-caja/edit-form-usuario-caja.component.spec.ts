import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormUsuarioCajaComponent } from './edit-form-usuario-caja.component';

describe('EditFormUsuarioCajaComponent', () => {
  let component: EditFormUsuarioCajaComponent;
  let fixture: ComponentFixture<EditFormUsuarioCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormUsuarioCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormUsuarioCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormUsuarioEcommerComponent } from './edit-form-usuario-ecommer.component';

describe('EditFormUsuarioEcommerComponent', () => {
  let component: EditFormUsuarioEcommerComponent;
  let fixture: ComponentFixture<EditFormUsuarioEcommerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormUsuarioEcommerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormUsuarioEcommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

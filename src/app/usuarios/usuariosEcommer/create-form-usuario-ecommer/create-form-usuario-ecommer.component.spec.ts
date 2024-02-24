import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormUsuarioEcommerComponent } from './create-form-usuario-ecommer.component';

describe('CreateFormUsuarioEcommerComponent', () => {
  let component: CreateFormUsuarioEcommerComponent;
  let fixture: ComponentFixture<CreateFormUsuarioEcommerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormUsuarioEcommerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormUsuarioEcommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

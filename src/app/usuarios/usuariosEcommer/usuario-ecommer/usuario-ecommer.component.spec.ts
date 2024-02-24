import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEcommerComponent } from './usuario-ecommer.component';

describe('UsuarioEcommerComponent', () => {
  let component: UsuarioEcommerComponent;
  let fixture: ComponentFixture<UsuarioEcommerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioEcommerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEcommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

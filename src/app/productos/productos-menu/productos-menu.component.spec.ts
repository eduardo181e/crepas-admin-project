import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMenuComponent } from './productos-menu.component';

describe('ProductosMenuComponent', () => {
  let component: ProductosMenuComponent;
  let fixture: ComponentFixture<ProductosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

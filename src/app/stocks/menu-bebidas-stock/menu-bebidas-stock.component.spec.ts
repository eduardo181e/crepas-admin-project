import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBebidasStockComponent } from './menu-bebidas-stock.component';

describe('MenuBebidasStockComponent', () => {
  let component: MenuBebidasStockComponent;
  let fixture: ComponentFixture<MenuBebidasStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBebidasStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBebidasStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

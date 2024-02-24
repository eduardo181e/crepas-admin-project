import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepasStockComponent } from './menu-crepas-stock.component';

describe('MenuCrepasStockComponent', () => {
  let component: MenuCrepasStockComponent;
  let fixture: ComponentFixture<MenuCrepasStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepasStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepasStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

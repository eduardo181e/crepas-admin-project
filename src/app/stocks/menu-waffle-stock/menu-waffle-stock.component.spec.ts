import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleStockComponent } from './menu-waffle-stock.component';

describe('MenuWaffleStockComponent', () => {
  let component: MenuWaffleStockComponent;
  let fixture: ComponentFixture<MenuWaffleStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

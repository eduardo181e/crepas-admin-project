import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleCanastaStockComponent } from './menu-waffle-canasta-stock.component';

describe('MenuWaffleCanastaStockComponent', () => {
  let component: MenuWaffleCanastaStockComponent;
  let fixture: ComponentFixture<MenuWaffleCanastaStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleCanastaStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleCanastaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

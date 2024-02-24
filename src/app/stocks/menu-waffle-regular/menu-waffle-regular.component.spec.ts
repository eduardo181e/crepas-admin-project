import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleStockRegularComponent } from './menu-waffle-regular.component';

describe('MenuWaffleRegularComponent', () => {
  let component: MenuWaffleStockRegularComponent;
  let fixture: ComponentFixture<MenuWaffleStockRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleStockRegularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleStockRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

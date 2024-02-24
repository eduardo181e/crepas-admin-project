import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleRegularSalesGlobalComponent } from './menu-waffle-regular-sales-global.component';

describe('MenuWaffleRegularSalesGlobalComponent', () => {
  let component: MenuWaffleRegularSalesGlobalComponent;
  let fixture: ComponentFixture<MenuWaffleRegularSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleRegularSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleRegularSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

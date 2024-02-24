import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleRegularSalesComponent } from './menu-waffle-regular-sales.component';

describe('MenuWaffleRegularSalesComponent', () => {
  let component: MenuWaffleRegularSalesComponent;
  let fixture: ComponentFixture<MenuWaffleRegularSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleRegularSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleRegularSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

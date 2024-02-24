import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWafflesSalesGlobalComponent } from './menu-waffles-sales.component';

describe('MenuWafflesSalesGlobalComponent', () => {
  let component: MenuWafflesSalesGlobalComponent;
  let fixture: ComponentFixture<MenuWafflesSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWafflesSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWafflesSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

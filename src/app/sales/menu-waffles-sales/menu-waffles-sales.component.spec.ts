import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWafflesSalesComponent } from './menu-waffles-sales.component';

describe('MenuWafflesSalesComponent', () => {
  let component: MenuWafflesSalesComponent;
  let fixture: ComponentFixture<MenuWafflesSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWafflesSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWafflesSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWafflesCanastaSalesGlobalComponent } from './menu-waffles-canasta-sales.component';

describe('MenuWafflesCanastaSalesGlobalComponent', () => {
  let component: MenuWafflesCanastaSalesGlobalComponent;
  let fixture: ComponentFixture<MenuWafflesCanastaSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWafflesCanastaSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWafflesCanastaSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

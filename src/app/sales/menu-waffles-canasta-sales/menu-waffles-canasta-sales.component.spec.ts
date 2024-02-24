import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWafflesCanastaSalesComponent } from './menu-waffles-canasta-sales.component';

describe('MenuWafflesCanastaSalesComponent', () => {
  let component: MenuWafflesCanastaSalesComponent;
  let fixture: ComponentFixture<MenuWafflesCanastaSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWafflesCanastaSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWafflesCanastaSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

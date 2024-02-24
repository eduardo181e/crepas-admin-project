import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleRegularComponent } from './menu-waffle-regular.component';

describe('MenuWaffleRegularComponent', () => {
  let component: MenuWaffleRegularComponent;
  let fixture: ComponentFixture<MenuWaffleRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleRegularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

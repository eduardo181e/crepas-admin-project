import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaffleCanastaComponent } from './menu-waffle-canasta.component';

describe('MenuWaffleCanastaComponent', () => {
  let component: MenuWaffleCanastaComponent;
  let fixture: ComponentFixture<MenuWaffleCanastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaffleCanastaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaffleCanastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

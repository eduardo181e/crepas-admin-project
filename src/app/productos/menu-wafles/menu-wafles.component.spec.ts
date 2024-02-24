import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWaflesComponent } from './menu-wafles.component';

describe('MenuWaflesComponent', () => {
  let component: MenuWaflesComponent;
  let fixture: ComponentFixture<MenuWaflesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWaflesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWaflesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

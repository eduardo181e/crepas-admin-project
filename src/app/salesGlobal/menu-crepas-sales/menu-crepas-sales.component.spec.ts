import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepasSalesGlobalComponent } from './menu-crepas-sales.component';

describe('MenuCrepasSalesGlobalComponent', () => {
  let component: MenuCrepasSalesGlobalComponent;
  let fixture: ComponentFixture<MenuCrepasSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepasSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepasSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

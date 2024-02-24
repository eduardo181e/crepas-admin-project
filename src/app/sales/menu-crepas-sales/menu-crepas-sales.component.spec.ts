import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepasSalesComponent } from './menu-crepas-sales.component';

describe('MenuCrepasSalesComponent', () => {
  let component: MenuCrepasSalesComponent;
  let fixture: ComponentFixture<MenuCrepasSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepasSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepasSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

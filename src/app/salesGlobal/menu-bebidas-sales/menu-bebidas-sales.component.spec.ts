import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBebidasSalesGlobalComponent } from './menu-bebidas-sales.component';

describe('MenuBebidasSalesGlobalComponent', () => {
  let component: MenuBebidasSalesGlobalComponent;
  let fixture: ComponentFixture<MenuBebidasSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBebidasSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBebidasSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

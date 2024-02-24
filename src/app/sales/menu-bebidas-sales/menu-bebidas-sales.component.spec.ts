import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBebidasSalesComponent } from './menu-bebidas-sales.component';

describe('MenuBebidasSalesComponent', () => {
  let component: MenuBebidasSalesComponent;
  let fixture: ComponentFixture<MenuBebidasSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBebidasSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBebidasSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaDulceStockComponent } from './menu-crepa-dulce-stock.component';

describe('MenuCrepaDulceStockComponent', () => {
  let component: MenuCrepaDulceStockComponent;
  let fixture: ComponentFixture<MenuCrepaDulceStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaDulceStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaDulceStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

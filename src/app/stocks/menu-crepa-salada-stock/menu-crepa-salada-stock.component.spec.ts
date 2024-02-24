import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaSaladaStockComponent } from './menu-crepa-salada-stock.component';

describe('MenuCrepaSaladaStockComponent', () => {
  let component: MenuCrepaSaladaStockComponent;
  let fixture: ComponentFixture<MenuCrepaSaladaStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaSaladaStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaSaladaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

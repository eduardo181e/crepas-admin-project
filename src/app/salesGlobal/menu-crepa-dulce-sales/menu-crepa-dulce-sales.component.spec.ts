import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaDulceSalesGlobalComponent } from './menu-crepa-dulce-sales.component';

describe('MenuCrepaDulceSalesGlobalComponent', () => {
  let component: MenuCrepaDulceSalesGlobalComponent;
  let fixture: ComponentFixture<MenuCrepaDulceSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaDulceSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaDulceSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

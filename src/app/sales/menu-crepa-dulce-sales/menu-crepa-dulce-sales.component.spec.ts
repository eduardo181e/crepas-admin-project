import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaDulceSalesComponent } from './menu-crepa-dulce-sales.component';

describe('MenuCrepaDulceSalesComponent', () => {
  let component: MenuCrepaDulceSalesComponent;
  let fixture: ComponentFixture<MenuCrepaDulceSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaDulceSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaDulceSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

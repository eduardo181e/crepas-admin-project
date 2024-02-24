import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaDulceComponent } from './menu-crepa-dulce.component';

describe('MenuCrepaDulceComponent', () => {
  let component: MenuCrepaDulceComponent;
  let fixture: ComponentFixture<MenuCrepaDulceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaDulceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaDulceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

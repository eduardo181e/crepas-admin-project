import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaSaladaSalesComponent } from './menu-crepa-salada-sales.component';

describe('MenuCrepaSaladaSalesComponent', () => {
  let component: MenuCrepaSaladaSalesComponent;
  let fixture: ComponentFixture<MenuCrepaSaladaSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaSaladaSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaSaladaSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

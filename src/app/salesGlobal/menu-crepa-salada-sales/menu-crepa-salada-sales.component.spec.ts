import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaSaladaSalesGlobalComponent } from './menu-crepa-salada-sales.component';

describe('MenuCrepaSaladaSalesGlobalComponent', () => {
  let component: MenuCrepaSaladaSalesGlobalComponent;
  let fixture: ComponentFixture<MenuCrepaSaladaSalesGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaSaladaSalesGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaSaladaSalesGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

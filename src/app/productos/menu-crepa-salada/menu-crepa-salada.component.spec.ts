import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrepaSaladaComponent } from './menu-crepa-salada.component';

describe('MenuCrepaSaladaComponent', () => {
  let component: MenuCrepaSaladaComponent;
  let fixture: ComponentFixture<MenuCrepaSaladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrepaSaladaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrepaSaladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

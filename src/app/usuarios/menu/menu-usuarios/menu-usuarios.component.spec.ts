import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUsuariosComponent } from './menu-usuarios.component';

describe('MenuUsuariosComponent', () => {
  let component: MenuUsuariosComponent;
  let fixture: ComponentFixture<MenuUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesEditFormComponent } from './sucursales-edit-form.component';

describe('SucursalesEditFormComponent', () => {
  let component: SucursalesEditFormComponent;
  let fixture: ComponentFixture<SucursalesEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalesEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucursalesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

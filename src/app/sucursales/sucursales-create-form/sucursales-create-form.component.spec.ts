import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesCreateFormComponent } from './sucursales-create-form.component';

describe('SucursalesCreateFormComponent', () => {
  let component: SucursalesCreateFormComponent;
  let fixture: ComponentFixture<SucursalesCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalesCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucursalesCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

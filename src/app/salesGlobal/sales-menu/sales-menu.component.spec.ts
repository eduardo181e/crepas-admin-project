import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGlobalMenuComponent } from './sales-menu.component';

describe('SalesGlobalMenuComponent', () => {
  let component: SalesGlobalMenuComponent;
  let fixture: ComponentFixture<SalesGlobalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesGlobalMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesGlobalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

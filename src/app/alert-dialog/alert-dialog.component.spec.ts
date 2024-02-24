import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HostListener } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog.component';
import { TranslatePipe } from '../translate/translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AlertDialogComponent>>;
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [ AlertDialogComponent, TranslatePipe ],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { mensaje: 'Mensaje de prueba' } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AlertDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set mensaje correctly from MAT_DIALOG_DATA', () => {
    expect(component.mensaje).toEqual('Mensaje de prueba');
  });

  it('should close dialog on cerrarDialogo', () => {
    component.cerrarDialogo();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

});

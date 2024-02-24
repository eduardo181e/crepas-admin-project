import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  constructor(private dialog: MatDialog) {}

  private dialogRef!: MatDialogRef<AlertDialogComponent>;

  mostrarAlerta(mensaje: string): void {
    // Cierra el diálogo anterior si está abierto
    if (this.dialogRef) {
      this.dialogRef.close();
    }
let dialogWidth = '100%';
  
    this.dialogRef = this.dialog.open(AlertDialogComponent, {
      disableClose: false,
      data: { mensaje },
      position: { top: '43px' },
      width: dialogWidth,
      maxWidth: 'none',
    });
  }
}
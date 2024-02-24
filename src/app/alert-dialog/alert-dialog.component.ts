import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  mensaje: string;
  screenWidth: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string },
    public dialogRef: MatDialogRef<AlertDialogComponent>
  ) {
    this.mensaje = data.mensaje;
    this.screenWidth = window.innerWidth;
  }
  
  @HostListener('window:resize')
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}

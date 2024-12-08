import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; date: string; id: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmAction(): void {
    this.dialogRef.close({ action: 'confirmed', eventId: this.data.id });
  }
}

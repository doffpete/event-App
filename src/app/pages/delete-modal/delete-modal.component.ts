import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EventResponseInterface } from '../../model/event.interface';
import { EventService } from '../../../services/event.service';
import { SupabaseService } from '../../../services/supabase.service';
import { IDialogData } from '../first-page/first-page.component';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  eventData!: EventResponseInterface;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private auth: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData,
    private dialogRef: DialogRef<string>
  ) {
    this.eventData = dialogData.extradata as EventResponseInterface;
  }

  async deleteEvent(event: EventResponseInterface) {
    if (event.id) {
      await this.eventService.deleteUserEvent(event.id);
      this.dialogRef.close('success');
      
    }
  }
}

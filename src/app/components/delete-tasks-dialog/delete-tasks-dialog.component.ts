import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-tasks-dialog',
  templateUrl: './delete-tasks-dialog.component.html',
  styleUrls: ['./delete-tasks-dialog.component.scss']
})
export class DeleteTasksDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTasksDialogComponent>
  ) { }

  ngOnInit(): void {

  }
}

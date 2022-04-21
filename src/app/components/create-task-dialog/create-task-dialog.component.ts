import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from 'src/app/classes/task';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  task: Task;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
  ) {
    this.task = new Task("", "", false, new Date());
  }

  ngOnInit(): void { }

  onNoClick(): void {
    // passes default task => not added to array
    this.dialogRef.close(new Task("","",false,new Date()));
  }

}

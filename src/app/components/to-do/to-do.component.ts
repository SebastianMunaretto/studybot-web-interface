import { DeleteTasksDialogComponent } from './../../components/delete-tasks-dialog/delete-tasks-dialog.component';
import { CreateTaskDialogComponent } from './../create-task-dialog/create-task-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/classes/task';
import { DiscordAuthService } from 'src/app/services/discord-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})

/*
  Idea 1: User presses save button to save the changes he made (add Task, mark as done, ...)
          Saves Bandwidth, only 1 simple request, user has to press save button
  Idea 2: Every action the user makes is a request. Mark as done would be a request that removes
          the task from the list. Bandwidth intensive, more work, user has a better experience

  Idea 2 was implemented
*/


export class ToDoComponent implements OnInit {

  toDoArray: Task[];
  processing: boolean;

  constructor(
    public dialog: MatDialog,
    private _discordAuthService: DiscordAuthService,
    private _router: Router
  ) {
    this.toDoArray = [];
    this.processing = false;
  }

  ngOnInit(): void {
    if (!this._discordAuthService.checkTokenValidity())
      this._router.navigateByUrl('/login')
    this._discordAuthService.getToDoList().subscribe(result => {
      this.toDoArray = result
    })

  }

  selectionChange(task: Task) {
    task.done = !task.done
    this.processing = true;
    this._discordAuthService.toggleCompleteTask(task).subscribe(result => {
      this.toDoArray = result;
    })
    this.processing = false;
  }

  openTaskDialog() {
    // .open returns a MatDialogReference
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      height: '500px',
      width: '600px'
    })

    // MatDialogReference sends notifications (closed, ...)
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "") {
        this._discordAuthService.addTask(result).subscribe(requestResult => {
          this.toDoArray = requestResult;
        })
      } else {
        alert("Title is required!");
      }
    });
  }

  openDeleteTasksDialog() {
    const dialogRef = this.dialog.open(DeleteTasksDialogComponent, {
      height: '200px',
      width: '300px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._discordAuthService.deleteTasks().subscribe(result => {
          this.toDoArray = result;
        })
      } else {
      }
    });

  }

  getDoneTasks() {
    return this.toDoArray.filter(item => item.done)
  }

  getUndoneTasks() {
    return this.toDoArray.filter(item => !item.done)
  }
}

import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/classes/task';
import { DiscordAuthService } from 'src/app/services/discord-auth.service';
import { Router } from '@angular/router';
import { StudybotApi } from 'src/app/types/apiTypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: StudybotApi.User;
  todoArray: Task[];
  studyIntervall!: number;
  breakIntervall!: number;

  constructor(private _discordAuthService: DiscordAuthService, private _router: Router) {
    this.todoArray = [];
  }

  ngOnInit(): void {

    // Redirects to login page if user is not logged in
    if (!this._discordAuthService.checkTokenValidity())
      this._router.navigateByUrl('/login')
    this._discordAuthService.getUserData().subscribe(result => {
      this.user = result;
    });

    this._discordAuthService.getToDoList().subscribe(result => {
      this.todoArray = result;
    })

    this._discordAuthService.getTimer().subscribe(result => {
      this.studyIntervall = result.studyTime;
      this.breakIntervall = result.breakTime;
    })

  }

  getUndoneTasks() {
    return this.todoArray.filter(task => !task.done)
  }

}

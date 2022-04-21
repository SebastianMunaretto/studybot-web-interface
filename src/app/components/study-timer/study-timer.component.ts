import { DiscordAuthService } from './../../services/discord-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-study-timer',
  templateUrl: './study-timer.component.html',
  styleUrls: ['./study-timer.component.scss']
})
export class StudyTimerComponent implements OnInit {

  studyIntervall: number;
  breakIntervall: number;

  constructor(
    private _discordAuthService: DiscordAuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.studyIntervall = 0;
    this.breakIntervall = 0;
  }

  ngOnInit(): void {
    if (!this._discordAuthService.checkTokenValidity())
      this._router.navigateByUrl('/login')
    this.getTimerData();
  }

  getTimerData() {
    this._discordAuthService.getTimer().subscribe(result => {
      this.studyIntervall = result.studyTime;
      this.breakIntervall = result.breakTime;
    })
  }

  incrementStudy() {
    this.studyIntervall++;
  }

  incrementBreak() {
    this.breakIntervall++;
  }

  decreaseStudy() {
    if (this.studyIntervall > 0)
      this.studyIntervall--;
  }

  decreaseBreak() {
    if (this.breakIntervall > 0)
      this.breakIntervall--;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "close", { duration: 2000 });
  }

  saveTimerData() {
    this._discordAuthService.setTimer(this.studyIntervall, this.breakIntervall).subscribe(result => {
      this.getTimerData();
      this.openSnackBar("Saved sucessfully!");
    })
  }
}

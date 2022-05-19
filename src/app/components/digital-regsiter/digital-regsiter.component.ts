import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { DiscordAuthService } from 'src/app/services/discord-auth.service';
import { Router } from '@angular/router';
import { StudybotApi } from 'src/app/types/apiTypes';

@Component({
  selector: 'app-digital-regsiter',
  templateUrl: './digital-regsiter.component.html',
  styleUrls: ['./digital-regsiter.component.scss']
})
export class DigitalRegsiterComponent implements OnInit {

  grades!: StudybotApi.Grades;
  average!: number;
  bestSubject;
  bestSubjectName;
  worstSubject;
  worstSubjectName;

  constructor(
    private _discordAuthService: DiscordAuthService,
    private _router: Router
  ) {
    this.bestSubject = 0;
    this.bestSubjectName = "";
    this.worstSubject = 12;
    this.worstSubjectName = "";
  }

  ngOnInit(): void {
    if (!this._discordAuthService.checkTokenValidity())
      this._router.navigateByUrl('/login')
    this._discordAuthService.getDigregGrades().subscribe(result => {
      this.grades = result;

      this.calculateOverview(result);
    })
  }
  calculateOverview(grades: StudybotApi.Grades) {

    let buffer = 0;
    let markedSubjectCount = 0;

    grades.map((element) => {
      if (element.averageSemester != null) {
        buffer += element.averageSemester;
        markedSubjectCount++;
        if (element.averageSemester >= this.bestSubject) {
          this.bestSubject = element.averageSemester;
          this.bestSubjectName = element.subject
        }
        if (element.averageSemester <= this.worstSubject) {
          this.worstSubject = element.averageSemester;
          this.worstSubjectName = element.subject;
        }
      }
    })

    this.average = Math.round(buffer / markedSubjectCount * 100)/100;
    this.bestSubject = Math.round(this.bestSubject * 100)/100;
    this.worstSubject = Math.round(this.worstSubject * 100)/100;

  }

}

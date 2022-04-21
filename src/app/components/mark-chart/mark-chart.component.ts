import { StudybotApi } from 'src/app/types/apiTypes';
import { DiscordAuthService } from './../../services/discord-auth.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

// type for chartjs dataset

type Dataset = { backgroundColor: string, label: string, data: { x: number, y: string }[] }[];

@Component({
  selector: 'app-mark-chart',
  templateUrl: './mark-chart.component.html',
  styleUrls: ['./mark-chart.component.scss']
})
export class MarkChartComponent implements OnInit {

  chart: any = [];
  grades!: StudybotApi.Grades;
  dataset!: Dataset;

  constructor(private _discordAuthService: DiscordAuthService) { }

  // TODO merge chart with grades data
  ngOnInit(): void {

    const sortGradeByDate = (a: any, b: any) => a.x < b.x ? -1 : 1;

    this._discordAuthService.getDigregGrades().subscribe((result) => {
      this.grades = result;

      const dataset: any = this.grades.map((s, index) => {
        return {
          backgroundColor: "#000000",
          borderColor: "#ffffff",
          label: s.subject,
          data: s.grades.map(g => {
            return {
              x: g.date as any,
              y: g.grade,
              r: g.weight
            }
          }).sort(sortGradeByDate),
        };
      });

      this.chart = new Chart('canvas', {
        type: "line",
        data: { datasets: dataset },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              max: 10,
              min: 3,
              ticks: {
                stepSize: 1,
              }
            }
          }
        }
      });
    })
  }
}

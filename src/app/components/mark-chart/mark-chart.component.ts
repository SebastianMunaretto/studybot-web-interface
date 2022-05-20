import { StudybotApi } from 'src/app/types/apiTypes';
import { DiscordAuthService } from './../../services/discord-auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import * as chroma from 'chroma-js';

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
  @Input("chartHeight") chartHeight!: string;



  constructor(private _discordAuthService: DiscordAuthService) {
  }

  // TODO merge chart with grades data
  ngOnInit(): void {
    console.log(this.chartHeight);


    const sortGradeByDate = (a: any, b: any) => a.x < b.x ? -1 : 1;

    this._discordAuthService.getDigregGrades().subscribe((result) => {
      this.grades = result;

      const dataset: any = this.grades.map((s, index) => {
        return {
          backgroundColor: chroma.hsl(index / this.grades.length * 360, .8, .8).hex("rgb"),
          borderColor: chroma.hsl(index / this.grades.length * 360, .8, .5).hex("rgb"),
          cubicInterpolationMode: 'monotone',
          tension: 0.6,
          pointRadius: 2,
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
        data: {datasets: dataset},
        options: {
          color: "#ffffff",
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              ticks: {
                color: "#ffffff",
              },
              grid: {
                color: chroma.css("white").alpha(.2).hex("rgba")
              }
            },
            y: {
              max: 11,
              min: 3,
              ticks: {
                stepSize: 1,
                color: "#ffffff",
              },
              grid: {
                color: chroma.css("white").alpha(.2).hex("rgba")
              }
            }
          }
        }
      });
    })
  }
}

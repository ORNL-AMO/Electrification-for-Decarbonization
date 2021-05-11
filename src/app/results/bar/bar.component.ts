import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { ResultsSummary } from 'src/app/models/calculationData';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  @Input()
  summary: ResultsSummary;
  @Input()
  title: string;

  @ViewChild('barChart', { static: false }) barChart: ElementRef;

  constructor(private plotlyService: PlotlyService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.drawChart();
  }

  ngOnChanges() {
    this.drawChart();
  }

  drawChart() {
    if (this.barChart) {
      let config = {
        displaylogo: false,
        displayModeBar: false,
        responsive: true
      };
      let barNames = ['Energy Reduction', 'Cost Reduction', 'CO&#8322; Reduction'];

      let barValues = [
        this.getNegativeLimit(this.summary.percentEnergyReduction), 
        this.getNegativeLimit(this.summary.percentCostReduction), 
        this.getNegativeLimit(this.summary.percentCO2Reduction)
      ];

      let resultTrace = {
        x: barNames,
        y: barValues,
        texttemplate: '%{y:.0f}%',
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
          color: barValues.map(value => this.getColor(value)),
          opacity: 0.8,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        },
        type: 'bar'
      };

      let layout = {
        barmode: 'stack',
        font: {
          family: "Helvetica Neue, sans-serif",
          size: 16
        },
        title: {
          font: {
            family: "Helvetica Neue, sans-serif",
          }
        },
        xaxis: {
          tickfont: {
            family: 'Helvetica Neue, sans-serif',
            size: 18,
            color: 'black'
          },
        },
        yaxis: {
          ticksuffix: '%',
          range: [-100, 100],
          tickfont: {
            family: 'Helvetica Neue, sans-serif',
            size: 14,
            color: 'black'
          },
        },
        margin: { t: 50, b: 75, l: 75, r: 25 },
        // paper_bgcolor: "#efefef",
      };

      this.plotlyService.newPlot(this.barChart.nativeElement, [resultTrace], layout, config);
    }


  }

  getNegativeLimit(percentValue): number {
    if (percentValue < -100) {
      percentValue = -100;
    } else if (percentValue > 100) {
      percentValue = 100;
    }
    return percentValue
  }

  getColor(percentValue: number): string {
    if (percentValue < -5) {
      return 'red';
    } else if (percentValue > 5) {
      return 'green';
    } else if (percentValue >= -5 && percentValue <= 5) {
      return 'orange';
    }
  }

}

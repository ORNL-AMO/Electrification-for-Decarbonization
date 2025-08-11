import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';

@Component({
    selector: 'app-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.css'],
    standalone: false
})
export class GaugeComponent implements OnInit {
  @Input()
  percentValue: number;
  @Input()
  title: string;

  @ViewChild('gaugeChart', { static: false }) gaugeChart: ElementRef;

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
    if(this.title == 'CO2 Reduction'){
      this.title = 'CO&#8322; Reduction';
    }
    if (this.gaugeChart) {
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: this.percentValue,
          number: { 
            suffix: '%',
            font: {
              family: "Helvetica Neue, sans-serif",
              size: 20
            }
          },
          title: { 
            text: this.title,
            font: {
              family: "Helvetica Neue, sans-serif",
              size: 20
            }
          },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: {
              range: [-100, 100],
              // tickwidth: 1 
            },
            bar: {
              color: this.getColor()
            }
            // steps: [
            //   { range: [-50, 0], color: "cyan" },
            //   { range: [0, 50], color: "royalblue" }
            // ]
          }
        }
      ];

      var layout = {
        font: {
          family: "Helvetica Neue, sans-serif"
        },
        title: {
          font: {
            family: "Helvetica Neue, sans-serif",
            // size: 18
          }
        },
        xaxis: {

        },
        yaxis: {

        },
        height: 175,
        margin: { t: 50, b: 0, l: 50, r: 50 },
        paper_bgcolor: "#efefef",
      };
      let config = {
        displaylogo: false,
        displayModeBar: false,
        responsive: true
      };
      this.plotlyService.newPlot(this.gaugeChart.nativeElement, data, layout, config);
    }


  }


  getColor(): string {
    if (this.percentValue < -5) {
      return 'red';
    } else if (this.percentValue > 5) {
      return 'green';
    } else if (this.percentValue >= -5 && this.percentValue <= 5) {
      return 'orange';
    }
  }

}

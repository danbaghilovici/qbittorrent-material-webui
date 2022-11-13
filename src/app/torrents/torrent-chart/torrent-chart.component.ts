import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartType} from "chart.js";
import {default as Annotation} from "chartjs-plugin-annotation";
import {BaseChartDirective} from "ng2-charts";
import {MediaMatcher} from "@angular/cdk/layout";
import {ITorrentHistory, TorrentHistory} from "../../qbit/models/torrent-data.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-torrent-chart',
  templateUrl: './torrent-chart.component.html',
  styleUrls: ['./torrent-chart.component.scss']
})
export class TorrentChartComponent implements OnInit {
  @Input() torrentHistory:Observable<TorrentHistory[]>;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: "Download Speed",
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(0,97,255)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: "Upload Speed",
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(239,59,59)',
        pointBackgroundColor: 'rgb(225,109,109)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 400000,400000,400000,400000,400000,400000,400000,400000,400000,400000 ],
        label: "Download Limit",
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(239,209,59)',
        pointBackgroundColor: 'rgb(173,171,91)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ '20:01:32', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(123,97,97,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      console.log("changed",this.chart);
      // if (this.chart){
      //   // todo check this
      //   this.chart.render();
      // }
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    Chart.register(Annotation);

  }

  ngOnInit(): void {
    this.torrentHistory.subscribe((data)=>{
      console.log(data);
      const dlSpeed:number[]=[];
      const upSpeed:number[]=[];
      const labels:string[]=[];
      data.forEach(value => {
        dlSpeed.push(value.dlSpeed);
        upSpeed.push(value.upSpeed);
        labels.push(value.date.toLocaleTimeString());
      });
      console.log(labels);
      this.lineChartData.datasets[0].data=dlSpeed;
      this.lineChartData.datasets[1].data=upSpeed;
      this.lineChartData.labels=labels;
      this.updateChart();
    })
  }

  private updateChart():void{
    if (this.chart){
      this.chart.update();
    }
  }



}

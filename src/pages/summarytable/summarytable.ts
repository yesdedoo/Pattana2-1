import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';


/**
 * Generated class for the SummarytablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-summarytable',
  templateUrl: 'summarytable.html',
})
export class SummarytablePage {

  @ViewChild('myChart') barCanvas;

  mixChart: any;
  ChartDisplay: any = "day";
  loading: any;

  //REST API
  ChartInfo: any;
  DayCAVG: any;
  DaySAVG: any;
  DayList: any;

  //Previous page pushed data
  Course_ID: any;
  Stu_ID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider: TestapiProvider,
    public loadingCtrl: LoadingController) {
    this.Course_ID = navParams.get('courseid');
    this.Stu_ID = navParams.get('stuid');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'hide'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummarytablePage');
    this.loading.present()
    this.GetChartData();
    setTimeout(() => {
      this.DateChart();
    }, 1000);

  }

  GoTohome() {
    //this.navCtrl.push(HomePage)
    //this.navCtrl.push(TabsPage)
  }

  GetChartData() {
    this.ChartInfo = from(this.testapiProvider.GetChartInfo(this.Stu_ID, this.Course_ID));
    this.ChartInfo.subscribe(val => {
      console.log(val);
      this.DayCAVG = val['DayCAVG'];
      this.DaySAVG = val['DaySAVG'];
      this.DayList = val['DayList'];
    })
  }

  Test1() {
    console.log(this.ChartDisplay);
  }

  DateChart() {
    if (this.mixChart) {
      this.mixChart.destroy();
    }
    this.loading.dismiss();
    this.mixChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.DayList,
        datasets: [
          {
            label: 'Line Dataset',
            data: this.DayCAVG,

            // Changes this dataset to become a line
            type: 'line',
            pointBackgroundColor: 'rgba(214, 69, 65, 1)',
            borderColor: [
              'rgba(25, 181, 254, 1)'
            ],
            backgroundColor: "transparent"
          }, {
            label: '# of Votes',
            data: this.DaySAVG,
            backgroundColor:
              'rgba(135, 211, 124, 1)'
            ,
            borderColor:
              'rgba(41, 241, 195, 1)'
            ,
            borderWidth: 1
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Custom Chart Title'
        }
      }

    });

  }

  LessonChart() {
    this.mixChart.destroy();
    this.mixChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',

          ],
          borderWidth: 1
        }, {
          label: 'Line Dataset',
          data: [5, 8, 11],

          // Changes this dataset to become a line
          type: 'line'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Custom Chart Title'
        }
      }

    });
  }
  CLOChart() {
    this.mixChart.destroy();
    this.mixChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Purple"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 17],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',

          ],
          borderWidth: 1
        }, {
          label: 'Line Dataset',
          data: [5, 8, 11, 14],

          // Changes this dataset to become a line
          type: 'line'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Custom Chart Title'
        }
      }

    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';
import { v } from '@angular/core/src/render3';


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
  displayShowQues: any;

  //REST API
  //Chart
  ChartInfo: any;
  QuesInfo: any;
  DayCAVG: any;
  DaySAVG: any;
  DayList: any;
  DayListR: any = [];
  MonthCAVG: any;
  MonthSAVG: any;
  MonthList: any;
  LEList: any;
  LEAVG: any;
  LOList: any;
  LOAVG: any;
  //ShowQues
  QuesID: any;
  QuesName: any;
  QuesAns: any;
  QuesCrr: any;


  //Previous page pushed data
  Course_ID: any;
  Stu_ID: any;

  DateChartShow: boolean = true;

  //Modal
  modal:any;
  btn:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider: TestapiProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.Course_ID = navParams.get('courseid');
    this.Stu_ID = navParams.get('stuid');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'hide'
    });

    // Get the button that opens the modal
    this.btn = document.querySelector('#myModal');
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummarytablePage');
    this.loading.present()
    this.GetChartData();

    // Get the modal
    this.modal = document.getElementsByClassName("modal")[0];
    console.log(this.modal)

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
      this.DayListR = val['DayListR'];
      this.MonthCAVG = val['MonthCAVG'];
      this.MonthSAVG = val['MonthSAVG'];
      this.MonthList = val['MonthList'];
      this.LEList = val['LEList'];
      this.LEAVG = val['LEAVG'];
      this.LOList = val['LOList'];
      this.LOAVG = val['LOAVG'];
      this.loading.dismiss();

    })

    this.DateChart();
  }

  Test1() {
    console.log(this.ChartDisplay);
  }

  DateChart() {
    if (this.mixChart) {
      this.mixChart.destroy();
    }
    this.DateChartShow = true;
    //Day Chart
    if (this.ChartDisplay == "day") {
      this.mixChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: this.DayList,
          datasets: [
            {
              label: 'Course Average',
              data: this.DayCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student Average',
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
            text: 'Day Chart'
          }
        }

      });


    }
    else {
      this.mixChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: this.MonthList,
          datasets: [
            {
              label: 'Course Average',
              data: this.MonthCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student Average',
              data: this.MonthSAVG,
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
            text: 'Month Chart'
          }
        }

      });

    }


  }

  LessonChart() {
    this.DateChartShow = false;
    this.mixChart.destroy();
    this.mixChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.LEList,
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
            data: this.LEAVG,
            backgroundColor:
              'rgba(213, 184, 255, 1)'
            ,
            borderColor:
              'rgba(190, 144, 212,1)'
            ,
            borderWidth: 1
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Lesson Chart'
        }
      }

    });

  }
  CLOChart() {
    this.DateChartShow = false;
    this.mixChart.destroy();
    this.mixChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.LOList,
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
            data: this.LOAVG,
            backgroundColor:
              'rgba(254, 241, 96, 1)'
            ,
            borderColor:
              'rgba(245, 230, 83, 1)'
            ,
            borderWidth: 1
          }]
      },
      options: {
        title: {
          display: true,
          text: 'CLO Chart'
        }
      }

    });

  }
  ShowQuestion(Date) {
    this.QuesInfo = from(this.testapiProvider.GetShowQuestion(this.Stu_ID, this.Course_ID, Date));
    this.QuesInfo.subscribe(val => {
      console.log(val);
      this.QuesID = val['QuesID'];
      this.QuesName = val['QuesName'];
      this.QuesAns = val['QuesAns'];
      this.QuesCrr = val['QuesCrr'];
    })
  }
  AlertShowQues() {
    if (this.displayShowQues) {
      this.displayShowQues = null;
    }
    this.displayShowQues = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    this.displayShowQues.present();
  }
  DisplayModalShowQues(){
    this.modal.style.display = "block";
  }
  HideModalShowQues(){
    this.modal.style.display = "none";
  }
}

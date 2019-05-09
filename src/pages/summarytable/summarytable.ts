import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  @ViewChild('myChart2') barCanvas2;
  @ViewChild('myChart3') barCanvas3;

  mixChart: any;
  mixChart2: any;
  mixChart3: any;
  ChartDisplay: any = "week";
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
  YearCAVG: any;
  YearSAVG: any;
  YearList: any;
  WeekCAVG: any;
  WeekSAVG: any;
  WeekList: any;
  LEList: any;
  LEAVG: any;
  LOList: any;
  LOAVG: any;
  //ShowQues
  QuesID: any = [];
  QuesName: any = [];
  QuesAns: any = [];
  QuesCrr: any = [];


  //Previous page pushed data
  Course_ID: any;
  Stu_ID: any;

  DateChartShow: boolean = true;

  //Modal
  modal: any;
  btn: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider: TestapiProvider,
    public loadingCtrl: LoadingController) {
    this.Course_ID = navParams.get('courseid');
    this.Stu_ID = navParams.get('stuid');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'hide'
    });

    // Get the button that opens the modal
    this.btn = document.querySelector('#myModal');


  }

  ionViewWillEnter() {
    this.loading.present()
    this.GetChartData();

    // Get the modal
    this.modal = document.getElementsByClassName("modal")[0];
    console.log(this.modal)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummarytablePage');

  }


  GetChartData() {
    this.ChartInfo = from(this.testapiProvider.GetChartInfo(this.Stu_ID, this.Course_ID));
    this.ChartInfo.subscribe(val => {
      console.log(val);
      this.DayCAVG = val['DayCAVG'];
      this.DaySAVG = val['DaySAVG'];
      this.DayList = val['DayList'];
      this.DayListR = val['DayListR'];
      this.YearCAVG = val['MonthCAVG'];
      this.YearSAVG = val['MonthSAVG'];
      this.YearList = val['MonthList'];
      this.WeekCAVG = val['WeekSAVG'];
      this.WeekSAVG = val['WeekCAVG'];
      this.WeekList = val['WeekList'];
      this.LEList = val['LEList'];
      this.LEAVG = val['LEAVG'];
      this.LOList = val['LOList'];
      this.LOAVG = val['LOAVG'];
      this.loading.dismiss();

      this.DateChart();
      this.LessonChart();
      this.CLOChart();

    })

    



  }


  DateChart() {
    if (this.mixChart) {
      this.mixChart.destroy();
    }
    this.DateChartShow = true;
    //Day Chart
    if (this.ChartDisplay == "week") {
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
    else if(this.ChartDisplay == "year"){
      this.mixChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: this.YearList,
          datasets: [
            {
              label: 'Course Average',
              data: this.YearCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student Average',
              data: this.YearSAVG,
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
            text: 'Year Chart'
          }
        }

      });

    }
    else if(this.ChartDisplay == "month"){
      this.mixChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: this.WeekList,
          datasets: [
            {
              label: 'Course Average',
              data: this.WeekCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student Average',
              data: this.WeekSAVG,
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

    this.mixChart2 = new Chart(this.barCanvas2.nativeElement, {

      type: 'radar',
      data: {
        labels: this.LEList,
        datasets: [
          {
            label: 'AVG Score',
            data: this.LEAVG,
            backgroundColor:
              'rgba(213, 184, 255, 0.5)'
            ,
            borderColor:
              'rgba(190, 144, 212, 0.5)'
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

    this.mixChart3 = new Chart(this.barCanvas3.nativeElement, {

      type: 'radar',
      data: {
        labels: this.LOList,
        datasets: [
          {
            label: 'AVG Score',
            data: this.LOAVG,
            backgroundColor:
              'rgba(240, 0, 0, 0.5)'
            ,
            borderColor:
              'rgba(245, 0, 0, 0.5)'
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

  DisplayModalShowQues() {
    this.modal.style.display = "block";
  }
  HideModalShowQues() {
    this.modal.style.display = "none";
  }
  
  DisplayClick(Type){
    switch (Type) {
      case 1:
        this.ChartDisplay = "week"
        break;
      case 2:
        this.ChartDisplay = "month"
        break;
      case 3:
        this.ChartDisplay = "year"
        break;
            
    }
    this.DateChart();
  }
}

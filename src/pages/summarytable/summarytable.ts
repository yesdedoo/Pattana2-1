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
  ChartDisplay: any = "day";
  loading: any;
  displayShowQues: any;
  IndexOfShowQues:any;

  //REST API
  //Chart
  ChartInfo: any;
  QuesInfo: any;
  DayCAVG: any;
  DaySAVG: any;
  DayList: any;
  DayListR: any = [];
  WeekCAVG: any;
  WeekSAVG: any;
  WeekList: any;
  NWeekCAVG: any = [];
  NWeekSAVG: any = [];
  NWeekList: any = [];
  MonthCAVG: any = [];
  MonthSAVG: any = [];
  MonthList: any = [];
  NMonthList: any = [];
  NMonthCAVG: any = [];
  NMonthSAVG: any = [];
  YearCAVG: any;
  YearSAVG: any;
  YearList: any;
  
  LEList: any;
  LEAVG: any;
  LOList: any;
  LOAVG: any;
  //ShowQues
  QuesID: any = [];
  QuesName: any = [];
  QuesAns: any = [];
  QuesCrr: any = [];
  CrrAlert: any;
  


  //Previous page pushed data
  Course_ID: any;
  Stu_ID: any;

  DateChartShow: boolean = true;

  //Modal
  modal: any;
  btn: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider: TestapiProvider,
    public loadingCtrl: LoadingController, public alertCtrl:AlertController) {
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
    this.IndexOfShowQues = this.DayListR[0];
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
      this.MonthCAVG = val['MonthCAVG'];
      this.MonthSAVG = val['MonthSAVG'];
      this.MonthList = val['MonthList'];
      this.WeekCAVG = val['WeekSAVG'];
      this.WeekSAVG = val['WeekCAVG'];
      this.WeekList = val['WeekList'];
      this.YearCAVG = val['YearCAVG'];
      this.YearSAVG = val['YearSAVG'];
      this.YearList = val['YearList'];
      this.LEList = val['LEList'];
      this.LEAVG = val['LEAVG'];
      this.LOList = val['LOList'];
      this.LOAVG = val['LOAVG'];

      this.NMonthList = this.MonthList.slice(this.MonthList.length-12,this.MonthList.length)
      this.NMonthCAVG = this.MonthCAVG.slice(this.MonthCAVG.length-12,this.MonthCAVG.length)
      this.NMonthSAVG = this.MonthSAVG.slice(this.MonthSAVG.length-12,this.MonthSAVG.length)
      this.NWeekList = this.WeekList.slice(this.WeekList.length-4,this.WeekList.length)
      this.NWeekCAVG = this.WeekCAVG.slice(this.WeekCAVG.length-4,this.WeekCAVG.length)
      this.NWeekSAVG = this.WeekSAVG.slice(this.WeekSAVG.length-4,this.WeekSAVG.length)
      this.loading.dismiss();

      this.DateChart();
      this.LessonChart();
      this.CLOChart();

      this.IndexOfShowQues = this.DayListR[0];
    })

    



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
              label: 'Course AVG Score',
              data: this.DayCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student AVG Score',
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
          },
          responsive: true, 
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
             display: true,
             ticks: {
              min: 0,
              max: 100,
              stepSize: 25
             }
            }]
           }
        }

      });


    }
    else if(this.ChartDisplay == "week"){
      this.mixChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: this.NMonthList,
          datasets: [
            {
              label: 'Course AVG Score',
              data: this.NMonthCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student AVG Score',
              data: this.NMonthSAVG,
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
          },
          scales: {
            yAxes: [{
             display: true,
             ticks: {
              min: 0,
              max: 100,
              stepSize: 25
             }
            }]
           }
        }

      });

    }
    else if(this.ChartDisplay == "month"){
      this.mixChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
          labels: this.NWeekList,
          datasets: [
            {
              label: 'Course AVG Score',
              data: this.NWeekCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student AVG Score',
              data: this.NWeekSAVG,
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
            text: 'Week Chart'
          },
          scales: {
            yAxes: [{
             display: true,
             ticks: {
              min: 0,
              max: 100,
              stepSize: 25
             }
            }]
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
              label: 'Course AVG Score',
              data: this.YearCAVG,

              // Changes this dataset to become a line
              type: 'line',
              pointBackgroundColor: 'rgba(214, 69, 65, 1)',
              borderColor: [
                'rgba(25, 181, 254, 1)'
              ],
              backgroundColor: "transparent"
            }, {
              label: 'Student AVG Score',
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
          },
          scales: {
            yAxes: [{
             display: true,
             ticks: {
              min: 0,
              max: 100,
              stepSize: 25
             }
            }]
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
    if(!Date){
      Date = this.DayList[0];
    }
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
        this.mixChart.destroy()
        this.ChartDisplay = "day"
        break;
      case 2:
        this.mixChart.destroy()
        this.ChartDisplay = "week"
        break;
      case 3:
        this.mixChart.destroy()
        this.ChartDisplay = "month"
        break;
      case 4:
        this.mixChart.destroy()
        this.ChartDisplay = "year"
        break;
            
    }
    this.DateChart();
  }
  DisplayCrrAns(CrrIndex){
    if(this.CrrAlert){
      this.CrrAlert.dismiss();
      this.CrrAlert = null;
    }
    this.CrrAlert = this.alertCtrl.create({
      title:"The Correct Answer is : "+"&emsp;"+this.QuesAns[CrrIndex],      
      buttons: ['Dismiss']

    })
    this.CrrAlert.present();
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
//import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  tabBarElement: any;

  Stu_ID: any;
  SStu_ID: any;
  SStu_Fname: any;
  currentDate: any;
  SendDate: any;
  Today: any
  HrTime: any
  MinTime: any
  SecTime: any

  Time: any
  RTime: Date
  utc: any;

  tempTime: any;

  notification: any;


  //Data from rest
  Ass_ID: any;
  Ass_Date: any;
  Ass_Time: any;
  Ass_QuesID: any;
  Ass_Exist: boolean;
  Ass_Done: any;

  //Data for countdown timer
  timeInSeconds: any
  time: any
  runTimer: any
  hasStarted: any
  hasFinished: any = false;
  remainingTime: any = 500;
  displayTime: any
  refreshTime: any = 300;

  decreaseTime:any;

  countHr: number;
  countMin: number;
  countSec:number;
  countResult: number;


  loading: any;
  SendLogLogout: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider, public smartAudio: SmartAudioProvider,
    public storage: Storage, public loadingCtrl: LoadingController, public localnotification: LocalNotifications) {

    //this.tabBarElement = document.querySelector('.tabbar#show-tabbar')
    //this.tabBarElement = document.querySelector('.tabs')
    //this.tabBarElement = document.querySelector("ion-tabbar")
    //this.tabBarElement = document.getElementsByClassName('tabs').item(1);



    /*
    setTimeout(() => {
      this.StartClock();

    }, 3000);*/

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');



  }
  ionViewWillEnter() {
    clearTimeout(this.decreaseTime)
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'hide'
    })

    this.loading.present();
    this.storage.get('stufname').then((val) => {
      console.log('storage stufname', val);
      this.SStu_Fname = val;
    });

    this.storage.get('stuid').then((val) => {
      console.log('storage stuid', val);
      this.Stu_ID = val
      this.SStu_ID = val[0]
      this.GetDate();
      this.CheckAssessment();

    });

  }


  GetDate() {

    this.currentDate = new Date();
    console.log("currentDate// new Date()", this.currentDate)
    this.HrTime = this.currentDate.getHours()
    this.MinTime = this.currentDate.getMinutes()
    this.SecTime = this.currentDate.getSeconds()
    this.Time = this.HrTime + ":" + this.MinTime + ":" + this.SecTime
    this.RTime = this.Time
    console.log("RTime", this.RTime)

    var YYYY = this.currentDate.getFullYear()
    var mm = this.currentDate.getMonth() + 1
    var dd = this.currentDate.getDate()
    if (mm < 10) {
      mm = "0" + mm
    }
    if (dd < 10) {
      dd = "0" + dd
    }
    this.Today = YYYY + "-" + mm + "-" + dd
    //this.Today = newstr.replace(re, "-")

    console.log("Today", this.Today)
    this.storage.set('today', this.Today)
  }


  CheckAssessment() {
    this.SendDate = from(this.testapiProvider.GetAssessment(this.Today, this.Stu_ID))
    this.SendDate.subscribe(val => {
      this.Ass_ID = val["Assess_ID"]
      this.Ass_Date = val["Date"]
      this.Ass_Time = val["Time"]
      this.Ass_QuesID = val["Ques_ID"]
      this.Ass_Exist = val["Exist"]
      this.Ass_Done = val["Done"]
      console.log("REST assessment", val)
      console.log("Splited val", this.Ass_ID, this.Ass_Time[0], this.Ass_Exist, this.Ass_Done)

      //Check the Done of assessment;

      if (this.Ass_Exist == true) {
        //Parse data JSON into number
        let assHr: string, assHr2: string, assHr3: number
        let assMin: string, assMin2: string, assMin3: number
        let assSec: string, assSec2: string, assSec3: number
        this.storage.set('assid', this.Ass_ID[0])
        assHr = JSON.stringify(this.Ass_Time[0])
        assHr2 = assHr.slice(1, 3)
        assHr3 = parseInt(assHr2)

        assMin = JSON.stringify(this.Ass_Time[0])
        assMin2 = assMin.slice(4, 6)
        assMin3 = parseInt(assMin2)
        console.log("assHR", assHr3, "assMin", assMin3)

        this.countHr = assHr3 - this.HrTime
        this.countMin = assMin3 - this.MinTime
        this.countSec = 0 - this.SecTime 
        console.log("countdown time", this.countHr, this.countMin,this.countSec)

        this.countResult = (((this.countHr * 60) + this.countMin) * 60) + this.countSec;
        console.log("Remaining Start", this.countResult)
      }
      else {
        console.log("There is no assessment today")
      }

      this.StartClock();
    })
  }

  //Create Notification
  Notification() {
    this.localnotification.schedule({
      id: 1,
      text: 'Single ILocalNotification'
      //data: { secret: key }
    });

  }

  //Countdown timer
  StartClock() {
    this.loading.dismiss();
    //if this.countResult > 0 then do
    if (this.Ass_Exist == true) {
      this.initTimer();
      this.startTimer();
    }
    else {
      console.log("There is no countdown clock")
    }

  }
  initTimer() {

    if (!this.timeInSeconds) {
      //Initial time to countdown
      //this.timeInSeconds = 60;//this.countResult; //1500
      this.timeInSeconds = this.countResult;
    }
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime)

  }


  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();

  }
  pauseTimer() {
    this.runTimer = false;
  }
  resumeTimer() {
    this.startTimer();
  }
  timerTick() {
    this.decreaseTime = setTimeout(() => {
      if (!this.runTimer) { return; }
      this.remainingTime--;
      console.log(this.remainingTime)
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime)
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      /*else {
        this.hasFinished = true;
      }*/
      else if(this.remainingTime<=0){
        this.hasFinished = true;
        this.timerTick();
      }
      if (this.remainingTime == -300) {
        clearTimeout(this.decreaseTime);
        this.navCtrl.setRoot(TabsPage)
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60)
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
  //End of countdown timer

  readytoquiz() {
    this.Notification();
    this.navCtrl.push(QuizPage, { "Stu_ID": this.Stu_ID, "Today": this.Today }, { animate: true, direction: 'forward' });

  }

  Logout() {
    this.SendLogLogout = from(this.testapiProvider.PushLogLogout(this.Stu_ID))
    this.navCtrl.setRoot(LoginPage, { animate: true, animation: 'transition', direction: 'back', duration: 500 })
  }

  clickSound() {
    this.smartAudio.play('clickSound');
  }




}

import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { JoincoursePage } from '../joincourse/joincourse';
import { QuizPage } from '../quiz/quiz';
//import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {
  
  tabBarElement: any;

  Stu_ID:any;
  currentDate: any;
  SendDate: any;
  Today:any
  HrTime:any
  MinTime:any
  SecTime:any
  
  Time:any
  RTime:Date
  utc:any;

  tempTime:any;
  
  notification:any;
 

  //Data from rest
  Ass_ID:any;
  Ass_Date:any;
  Ass_Time:any;
  Ass_QuesID:any;
  Ass_Exist:boolean;

  //Data for countdown timer
  timeInSeconds:any
  time:any
  runTimer:any
  hasStarted:any
  hasFinished:any
  remainingTime:any
  displayTime:any
  
  countHr:number;
  countMin:number;
  countResult:number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testapiProvider:TestapiProvider,
    public storage: Storage) {
    
    //this.tabBarElement = document.querySelector('.tabbar#show-tabbar')
    //this.tabBarElement = document.querySelector('.tabs')
    //this.tabBarElement = document.querySelector("ion-tabbar")
    //this.tabBarElement = document.getElementsByClassName('tabs').item(1);
    
    
      //trigger:{ at: new Date(new Date().getTime() +this.countResult)      }
      //Date is the time that notify}*/
   

    this.Stu_ID = navParams.get('Stu_ID')
    console.log(this.Stu_ID);

    //Get DATE&TIME
    this.GetDate();
    
    this.CheckAssessment();
    setTimeout(() => {
      this.StartClock();

    }, 3000);
  
  }
  /* //Hide tab section
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    console.log('ionViewDidLoad AlldetailPage');
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }*/
  GetDate(){
    
    let utc2
    this.currentDate = new Date();
    this.HrTime = this.currentDate.getHours()
    this.MinTime =this.currentDate.getMinutes()
    this.SecTime = this.currentDate.getSeconds() 
    this.utc = this.currentDate.toJSON().slice(0,10).replace(/-/g,'/');  
    
    this.Time = this.HrTime+":"+this.MinTime+":"+this.SecTime
    this.RTime = this.Time
    var re = '/'
    var newstr = this.utc.replace(re,"-"); 
    console.log(this.RTime)
    this.Today = newstr.replace(re,"-")
    console.log(this.currentDate)
    console.log(this.Today)

  }


  CheckAssessment(){
    this.SendDate = from(this.testapiProvider.GetAssessment(this.Today))
    this.SendDate.subscribe(val =>{
      this.Ass_ID=val["Assess_ID"]
      this.Ass_Date=val["Date"]
      this.Ass_Time=val["Time"]
      this.Ass_QuesID=val["Ques_ID"]
      this.Ass_Exist=val["Exist"]
      console.log(val) 
      console.log(this.Ass_ID,this.Ass_Time[0],this.Ass_Exist)

      if(this.Ass_Exist==true){
        //Parse data JSON into number
        let assHr: string, assHr2: string, assHr3: number
        let assMin: string, assMin2: string, assMin3: number
        assHr = JSON.stringify(this.Ass_Time[0])
        assHr2 = assHr.slice(1, 3)
        assHr3 = parseInt(assHr2)

        assMin = JSON.stringify(this.Ass_Time[0])
        assMin2 = assMin.slice(4, 6)
        assMin3 = parseInt(assMin2)
        console.log(assHr3, assMin3)

        this.countHr = assHr3 - this.HrTime
        this.countMin = assMin3 - this.MinTime
        console.log(this.countHr, this.countMin)

        this.countResult = ((this.countHr * 60) + this.countMin) * 60
        console.log(this.countResult)
      }
      else{
        console.log("There is no assessment today")
      }
      
      
    })
  }

  //Create Notification
  Notification(){
    
   
  }

  //Countdown timer
  StartClock(){

    //if this.countResult > 0 then do
    if(this.Ass_Exist==true){
      this.initTimer();
      this.startTimer();
    }
    else
    {
      console.log("There is no countdown clock")
    }
    
  }
  initTimer(){

    if(!this.timeInSeconds){
      //Initial time to countdown
      this.timeInSeconds = 60;//this.countResult; //1500
    }
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime)
  }
  startTimer(){
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
    
  }
  pauseTimer(){
    this.runTimer = false;
  }
  resumeTimer(){
    this.startTimer();
  }
  timerTick(){
    setTimeout(()=>{
      if(!this.runTimer){return;}
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime)
      if(this.remainingTime>0){
        this.timerTick();
      }
      else{
        this.hasFinished = true;
      }
    },1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number){
    var sec_num = parseInt(inputSeconds.toString(),10);
    var hours = Math.floor(sec_num/3600);
    var minutes = Math.floor((sec_num - (hours * 3600))/60);
    var seconds = sec_num - (hours * 3600) - (minutes*60)
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours:hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes:minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds: seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
  //End of countdown timer

 readytoquiz(){
    this.navCtrl.setRoot(QuizPage,{"Stu_ID":this.Stu_ID,"Today":this.Today}); 
    this.Notification();
    
  }

  JoinCourse(){
    this.navCtrl.push(JoincoursePage);
  }
  

}

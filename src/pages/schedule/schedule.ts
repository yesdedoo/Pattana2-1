import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';


/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    showMonthPicker: true,
    monthPickerFormat: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };

  posInterject = ["Oh!", "Ouch!", "Alas!"];
  negInterject = ["Congratulation!", "Wowww!", "Yahoo!"];
  alert = ["You have problems to remeber knowledge of ",
    "You should focus more about the topics "];
  caution = ["You just forgot some details about ",
    "You should review in the topic "];
  compliment = ["You have improved about ",
    "You got improvement of understanding "];
  motivatedAd = ["Let’s try to against it next time", "Push yourself"];
  praisedAd = ["Well done!", "Keep up the good work"];
  
  
  fb: any;

  //REST Variable
  SendFBRequest:any;
  FBId:any=[];
  FBName:any=[];
  FBDate:any=[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public testapiProvider:TestapiProvider) {




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.ShowFeedback();

  }

  ShowFeedback(){
    this.SendFBRequest = from(this.testapiProvider.GetFeedback())
    this.SendFBRequest.subscribe(val=>{
      this.FBId = val["FBId"]
      this.FBName = val["FBName"]
      this.FBDate = val["FBDate"]

      setTimeout(() => {
        console.log("FB",this.FBId,this.FBName,this.FBDate)  
      }, 2000);
      
    })
  }

  returnFeedback() {
    var feedback = []
    var feedN = 0;

    var forgotenQ = [], improvedLess = [], dropedLess = [], dangerLess = [];
    var forgotN = 0, imLessN = 0, drLessN = 0, dangLessN = 0;

    var LessN = 0;
  }

  RandPosInt() {
    let posInterjectLen = this.posInterject.length
    return this.posInterject[Math.floor(Math.random() * posInterjectLen)]
  }
  RandNegInt() {
    let negInterjectLen = this.negInterject.length
    return this.negInterject[Math.floor(Math.random() * negInterjectLen)]

  }
  RandAlert() {
    let alertLen = this.alert.length
    return this.alert[Math.floor(Math.random() * alertLen)]

  }
  RandCaution() {
    let cautionLen = this.caution.length
    return this.caution[Math.floor(Math.random() * cautionLen)]

  }
  RandCompliment() {
    let complimentLen = this.compliment.length
    return this.compliment[Math.floor(Math.random() * complimentLen)]

  }
  RandMotivatedAd() {
    let motivatedAdLen = this.motivatedAd.length
    return this.motivatedAd[Math.floor(Math.random() * motivatedAdLen)]

  }
  RandPraisedAd() {
    let praisedAdLen = this.praisedAd.length
    return this.praisedAd[Math.floor(Math.random() * praisedAdLen)]

  }
  AlertFeedback() {
    let CID: any;
    if (this.fb) {
      this.fb.dismiss();
      this.fb = null;
    }

    this.fb = this.alertCtrl.create({
      title: 'Join Course',
      message: "Enter a ID of the course that you receieved from the instructor",
      inputs: [
        {
          name: 'CID',
          placeholder: 'Course ID'
        },
      ],
      buttons: [
        {
          text: 'Close',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.fb.present();

  }

}

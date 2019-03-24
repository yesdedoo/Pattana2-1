import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';

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
  motivatedAd = ["Let’s try to against it next time ;)", "Push yourself ;)"];
  praisedAd = ["Well done!", "Keep up the good work"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  returnFeedback(){
    var feedback=[]
    var feedN =0;

    var forgotenQ =[],improvedLess=[],dropedLess=[],dangerLess=[];
    var forgotN=0,imLessN=0,drLessN=0,dangLessN=0;

    var LessN=0;
  }

  RandPosInt(){
    let posInterjectLen = this.posInterject.length
    return this.posInterject[Math.floor(Math.random()*posInterjectLen)]
  }
  RandNegInt(){
    let negInterjectLen = this.negInterject.length
    return this.negInterject[Math.floor(Math.random()*negInterjectLen)]

  }
  RandAlert(){
    let alertLen = this.alert.length
    return this.alert[Math.floor(Math.random()*alertLen)]

  }
  RandCaution(){
    let cautionLen = this.caution.length
    return this.caution[Math.floor(Math.random()*cautionLen)]

  }
  RandCompliment(){
    let complimentLen = this.compliment.length
    return this.compliment[Math.floor(Math.random()*complimentLen)]

  }
  RandMotivatedAd(){
    let motivatedAdLen = this.motivatedAd.length
    return this.motivatedAd[Math.floor(Math.random()*motivatedAdLen)]

  }
  RandPraisedAd(){
    let praisedAdLen = this.praisedAd.length
    return this.praisedAd[Math.floor(Math.random()*praisedAdLen)]

  }

}

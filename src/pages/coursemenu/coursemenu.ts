import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResulthistpercPage } from '../resulthistperc/resulthistperc';
import { SummarytablePage } from '../summarytable/summarytable';

/**
 * Generated class for the CoursemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coursemenu',
  templateUrl: 'coursemenu.html',
})
export class CoursemenuPage {


  Course_ID:any;
  Course_Name:any;
  Stu_ID:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Course_ID = navParams.get('courseid')
    this.Course_Name = navParams.get('coursename')
    this.Stu_ID = navParams.get('stuid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursemenuPage');
  }

  GoToCourseDetail(){
    this.navCtrl.push(ResulthistpercPage, { 'courseid': this.Course_ID, 'coursename': this.Course_Name, 'stuid': this.Stu_ID });
  }
  GoToSummary(){
    this.navCtrl.push(SummarytablePage,{'courseid':this.Course_ID,'stuid': this.Stu_ID});
  }
}

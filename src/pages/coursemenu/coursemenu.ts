import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResulthistpercPage } from '../resulthistperc/resulthistperc';
import { SummarytablePage } from '../summarytable/summarytable';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';

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

  //Progress bar
  max: number = 100;
  stroke: number = 20;
  radius: number = 75;
  semicircle: boolean = false;
  rounded: boolean = true;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'linearEase';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  rate:number;

  //API Variable
  RequestCourseProgress:any;
  APDo:any;
  APAll:any;
  APAssProgress:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider:TestapiProvider) {
    this.Course_ID = navParams.get('courseid')
    this.Course_Name = navParams.get('coursename')
    this.Stu_ID = navParams.get('stuid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursemenuPage');
    this.GetCourseProgress();
  }
  GetCourseProgress(){
    this.RequestCourseProgress = from(this.testapiProvider.GetCourseProgress(this.Stu_ID, this.Course_ID));
    this.RequestCourseProgress.subscribe(val => {
      console.log(val)
      this.APDo = val['APDo'];
      this.APAll = val['APAll'];
      this.APAssProgress = val['AssProgress'];
    })
  }

  GoToCourseDetail(){
    this.navCtrl.push(ResulthistpercPage, { 'courseid': this.Course_ID, 'coursename': this.Course_Name, 'stuid': this.Stu_ID });
  }
  GoToSummary(){
    this.navCtrl.push(SummarytablePage,{'courseid':this.Course_ID,'stuid': this.Stu_ID});
  }
}

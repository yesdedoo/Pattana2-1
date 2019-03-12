import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResulthistpercPage } from '../resulthistperc/resulthistperc';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  CourseInfo:any;
  Stu_ID:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider: TestapiProvider) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    console.log(this.Stu_ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    this.CourseInfo = from(this.testapiProvider.DisplayCourse(this.Stu_ID));
    this.CourseInfo.subscribe(val =>{
      console.log(val)
    })
  }

  Database()
  {
    this.navCtrl.push(ResulthistpercPage);
  }


}

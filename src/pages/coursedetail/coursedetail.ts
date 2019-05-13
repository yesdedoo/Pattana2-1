import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';

/**
 * Generated class for the CoursedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coursedetail',
  templateUrl: 'coursedetail.html',
})
export class CoursedetailPage {



  //REST API 
  RequestCourseDesc:any;
  Course_ID:any;
  Course_Name:any;
  Course_Desc:any;
  CLO_ID:any;
  CLO_Name:any;
  Less_ID:any;
  Less_Name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider:TestapiProvider) {

    this.Course_ID = navParams.get('courseid')
    this.Course_Name = navParams.get('coursename')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursedetailPage');
    this.GetCourseDesc();
  }
  GetCourseDesc(){
    this.RequestCourseDesc = from(this.testapiProvider.GetCourseDesc(this.Course_ID));
    this.RequestCourseDesc.subscribe(val => {
      console.log(val)
      this.Course_Desc = val['Course_Desc'];
      this.CLO_ID = val['CLO_ID']
      this.CLO_Name = val['CLO_Name']
      this.Less_ID = val['Less_ID']
      this.Less_Name = val['Less_Name'];
    })
  }

}

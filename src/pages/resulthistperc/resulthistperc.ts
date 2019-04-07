import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';


/**
 * Generated class for the ResulthistpercPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resulthistperc',
  templateUrl: 'resulthistperc.html',
})
export class ResulthistpercPage {

  current1: number = 60;
  current2: number = 75;
  current3: number = 80;
  current4: number = 55;
  
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
  course: Array <any> =[];

  //Get pushed data from ResultofCourse page
  Stu_ID:any;
  Course_ID:any
  Course_Name:any;

  

  //Rest variable
  SendLessonRequest:any;
  Less_ID:any;
  Less_Know:any;
  Less_AVGResult:any;
  LessLength:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider:TestapiProvider,public loadingCtrl:LoadingController) {
  
   this.course=["Data Modeling","Database Concept","Database Design","Database Management"]
   this.Course_ID = navParams.get('courseid')
   this.Course_Name = navParams.get('coursename')
   this.Stu_ID = navParams.get('stuid')
   console.log(this.Course_ID,this.Stu_ID)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResulthistpercPage');
    this.GetLesson();  

    
    
  }


  GetLesson(){
    this.SendLessonRequest = from(this.testapiProvider.GetLesson(this.Course_ID,this.Stu_ID))
    this.SendLessonRequest.subscribe(val =>{
      console.log(val)
      this.Less_ID = val["Less_ID"]
      this.Less_Know = val["Less_Know"]
      this.Less_AVGResult = val["Less_AVGResult"]

      this.LessLength = this.Less_ID.length
      console.log(this.Less_ID,this.Less_Know,this.Less_AVGResult)
    })
  }
  

  

}

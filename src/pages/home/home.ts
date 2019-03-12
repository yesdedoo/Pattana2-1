import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { JoincoursePage } from '../joincourse/joincourse';
import { SchedulePage } from '../schedule/schedule';
import { QuizPage } from '../quiz/quiz';
import { CountPage } from '../count/count';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {

  currentDate: any;
  Stu_ID:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentDate = new Date();
    this.Stu_ID = navParams.get('Stu_ID')
    console.log(this.Stu_ID);
    
  }

 readytoquiz(){
    this.navCtrl.setRoot(CountPage);
  
    
  }

  JoinCourse(){
    this.navCtrl.push(JoincoursePage);
  }
  

}

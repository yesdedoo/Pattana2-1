import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { JoincoursePage } from '../joincourse/joincourse';
import { SchedulePage } from '../schedule/schedule';
import { QuizPage } from '../quiz/quiz';
import { CountPage } from '../count/count';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {

  currentDate;
  formattedDate;
  currentHour;
  currentMinute;
  currentTime;
  
  
  constructor(public navCtrl: NavController) {
    this.currentDate = new Date();
    
    
  }

 readytoquiz(){
    this.navCtrl.setRoot(CountPage);
  
    
  }

  JoinCourse(){
    this.navCtrl.push(JoincoursePage);
  }
  

}

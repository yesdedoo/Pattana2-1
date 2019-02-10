import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import { QuizPage } from '../quiz/quiz';
/**
 * Generated class for the CountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-count',
  templateUrl: 'count.html',
})
export class CountPage {

  timerVar;
  timerVal;

  constructor(public navCtrl: NavController) {
    this.startTimer()
  }


 startTimer(){
   this.timerVar = Observable.interval(1000).subscribe( x=> {
     console.log(x)
     this.timerVal = x;

     if(x==2){
      this.navCtrl.push(QuizPage)
     }
   })
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CountPage');
  }

  


}

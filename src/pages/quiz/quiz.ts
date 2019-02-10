import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RankPage } from '../rank/rank';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {


  Ques: Array <any> =[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.Ques = [
      "The type of diagram in which the operations are apecified on objects is considered as"
    ]
  }

  finishquiz(){
    this.navCtrl.push(RankPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

}

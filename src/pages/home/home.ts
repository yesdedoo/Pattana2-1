import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JoincoursePage } from '../joincourse/joincourse';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  JoinCourse(){
    this.navCtrl.push(JoincoursePage);
  }
}

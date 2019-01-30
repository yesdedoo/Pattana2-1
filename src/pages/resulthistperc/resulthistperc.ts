import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResulthistpercPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resulthistperc',
  templateUrl: 'resulthistperc.html',
})
export class ResulthistpercPage {

  course: Array <any> =[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
   this.course=["Data Modeling","Database Concept","Database Design","Database Management"]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResulthistpercPage');
  }

  

}

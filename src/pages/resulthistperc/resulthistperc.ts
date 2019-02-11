import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgStyle } from '@angular/common';

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

  current: number = 75;
  max: number = 100;
  stroke: number = 20;
  radius: number = 75;
  semicircle: boolean = true;
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
   this.course=["Data Modeling","Database Concept","Database Design","Database Management"]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResulthistpercPage');
  }

  

}

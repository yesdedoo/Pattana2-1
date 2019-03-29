import { Component } from '@angular/core';
import { NavController, NavParams, AlertCmp, AlertController } from 'ionic-angular';
import { TestapiProvider } from '../../providers/testapi/testapi';

/**
 * Generated class for the ShowlessonfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-showlessonfeed',
  templateUrl: 'showlessonfeed.html',
})
export class ShowlessonfeedPage {

  Less_ID: any;
  Less_Know: any;
  Feed_Type: any;
  Feed_Text: any;
  Feed_Date: any;
  Feed_Old: any;
  Feed_New: any;

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
  rate: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public testapiProvider: TestapiProvider, ) {

    this.Less_ID = navParams.get('lessID')
    this.Less_Know = navParams.get('lessKnow')
    this.Feed_Type = navParams.get('feedType')
    this.Feed_Text = navParams.get('feedText')
    this.Feed_Date = navParams.get('feedDate')
    this.Feed_Old = navParams.get('feedOld')
    this.Feed_New = navParams.get('feedNew')
    console.log(this.Less_ID, this.Less_Know, this.Feed_Type, this.Feed_Text, this.Feed_Date, this.Feed_Old, this.Feed_New)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');

  }

}

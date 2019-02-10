import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }
  
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
    this.presentAlert();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Congratulation',
      subTitle: 'You got a special card',
      buttons: ['Understood']
    });
    alert.present();
    
  }
  ClickOnCard(){
    this.navCtrl.push(TabsPage);
  }
}

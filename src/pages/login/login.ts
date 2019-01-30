import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loggingin(){
    this.navCtrl.setRoot(TabsPage)
  }

  register()
  {
    this.navCtrl.push(RegisterPage)
  }

}

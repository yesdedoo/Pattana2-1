import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the JoincoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joincourse',
  templateUrl: 'joincourse.html',
})
export class JoincoursePage {

  constructor(public alertCtrl: AlertController, private navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoincoursePage');
  }

  AlertJoin() {
    const prompt = this.alertCtrl.create({
      title: 'Join Course',
      message: "Enter course ID",
      inputs: [
        {
          name: 'CourseID',
          placeholder: 'CourseID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Join',
          handler: data => {
            console.log('Join clicked');
          }
        }
      ]
    });
    prompt.present();
  }


}

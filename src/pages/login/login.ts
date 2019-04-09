import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, AlertController, Platform, ViewController } from 'ionic-angular';
import { UsernameValidator } from '../../providers/username/username';
import { Storage } from '@ionic/storage';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';


/**
 * 
 * 
 * 
 * 
 * Generated class for the Login2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  SendLogin: any;
  username: string;
  password: string;
  Stu_ID: any;
  Stu_Fname: any;

  FailToast: any;
  EmptyToast: any;
  PermText: any;

  submitAttempt: boolean = false;

  requestSendEmail: any;
  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public localNotification: LocalNotifications,
    public testapiProvider: TestapiProvider, public storage: Storage, public toastCtrl: ToastController, public androidPermission: AndroidPermissions,
    public platform: Platform, public smartAudio: SmartAudioProvider,
    public viewCtrl: ViewController) {

    //var permissions = cordova.plugins.Permissions
    this.PermText = "AndroidPermission: ";
    this.slideOneForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), UsernameValidator.checkUsername],
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      password: [''],
      age: ['']
    });

  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.initializeBackButtonCustomHandler();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login2Page');
    //
    this.storage.clear();
  }



  clickSound() {
    this.smartAudio.play('clickSound');
  }


  ShowNoti() {

    this.localNotification.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      data: { secret: "Test Noti" }
    });



  }

  Login() {
    console.log("username", this.username);
    console.log("password", this.password);
    // Schedule a single notification

    if (this.FailToast) {
      this.FailToast.dismiss();
      this.FailToast = null;

    }
    if (this.EmptyToast) {
      this.EmptyToast.dismiss();
      this.EmptyToast = null;


    }

    if (this.username && this.password) {
      this.SendLogin = from(this.testapiProvider.CheckLogin(this.username, this.password))
      this.SendLogin.subscribe(val => {
        console.log(val)
        this.Stu_ID = val["Stu_ID"];
        this.Stu_Fname = val["Stu_FNAME"];
        this.storage.set('stufname', this.Stu_Fname);

        console.log("Stu_ID: ", this.Stu_ID)
        if (val["exist"] == true) {
          //Need to think about the page that should send data to
          this.storage.set('stuid', this.Stu_ID);
          this.navCtrl.setRoot(TabsPage, { "tempStu_ID": this.Stu_ID.valueOf() }, { animate: true, animation: 'transition', direction: 'forward', duration: 500 })
        }
        else {
          console.log("Login fail// no account")

          this.FailToast = this.toastCtrl.create({
            message: 'Login failed no existed account',
            duration: 2000
          });
          this.FailToast.present()


        }
      })

    }
    else {
      console.log("Empty input")

      this.EmptyToast = this.toastCtrl.create({
        message: 'Login failed empty input',
        duration: 2000
      });
      this.EmptyToast.present();

    }
  }


  register() {
    this.navCtrl.push(RegisterPage, { animate: true, animation: 'transition', direction: 'forward', duration: 300 })
  }

}

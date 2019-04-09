import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ViewController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { Storage } from '@ionic/storage';
import { LessonfeedlistsPage } from '../lessonfeedlists/lessonfeedlists';


/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    showMonthPicker: true,
    monthPickerFormat: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };


  fb: any;

  //REST Variable
  SendFBRequest: any;
  FBId: any = [];
  FBName: any = [];
  FBDate: any = [];
  CourseInfo: any;

  //Display Course
  Course = [];
  Course_ID: any;
  Course_Code: any;
  Course_Name: any;
  Course_Exist: boolean

  //Storage Variable
  Stu_IDStorage: any;

  
  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public testapiProvider: TestapiProvider, public storage: Storage, public platform: Platform,
    public viewCtrl:ViewController) {



  }
  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');

  }
  ionViewWillEnter() {
    this.initializeBackButtonCustomHandler();
    this.viewCtrl.showBackButton(false);
    this.storage.ready().then(() => this.storage.get('stuid')
      .then(res => {
        console.log('stuid got:', res);
        this.Stu_IDStorage = res;
        this.ShowCourse();

      }).then(() => console.log("Stuidstorage: ", this.Stu_IDStorage))


    );

  }


  ShowCourse() {
    this.CourseInfo = from(this.testapiProvider.GetCourse(this.Stu_IDStorage));
    this.CourseInfo.subscribe(val => {

      console.log(val)
      this.Course_ID = val["Course_ID"]
      this.Course_Code = val["Course_Code"]
      this.Course_Name = val["Course_Name"]
      this.Course_Exist = val["Exist"]
      console.log(this.Course_Code, this.Course_ID, this.Course_Name)

      var conditionLength = this.Course_ID.length
      for (var j = 0; j < conditionLength; j++) {
        let temp: string
        temp = this.Course_Code[j] + " " + this.Course_Name[j]
        if (this.Course.indexOf(temp) == -1) {
          this.Course.push(temp)

        }
        console.log(this.Course[j])

      }
      console.log(this.Course)
    })
  }

  AlertFeedback() {
    let CID: any;
    if (this.fb) {
      this.fb.dismiss();
      this.fb = null;
    }

    this.fb = this.alertCtrl.create({
      title: 'Join Course',
      message: "Enter a ID of the course that you receieved from the instructor",
      inputs: [
        {
          name: 'CID',
          placeholder: 'Course ID'
        },
      ],
      buttons: [
        {
          text: 'Close',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.fb.present();

  }

  ShowLessonFeedList(index) {
    console.log(index)
    var CourseID = this.Course_ID[index]
    this.navCtrl.push(LessonfeedlistsPage, { 'courseid': CourseID, 'coursename': this.Course_Name[index], 'stuid': this.Stu_IDStorage });
  }

}

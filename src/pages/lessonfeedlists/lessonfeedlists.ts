import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { Storage } from '@ionic/storage';
import { ShowlessonfeedPage } from '../showlessonfeed/showlessonfeed';

/**
 * Generated class for the LessonfeedlistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lessonfeedlists',
  templateUrl: 'lessonfeedlists.html',
})
export class LessonfeedlistsPage {

  //Get pushed data from ResultofCourse page
  Stu_ID: any;
  Course_ID: any
  Course_Name: any;
  Today: any;
  TodayStorage: any;

  //Rest variable
  SendLessonRequest: any;
  Less_ID: any;
  Less_Know: any;
  Feed_Type: any = [];
  Feed_Text: any;
  Feed_Date: any;
  Feed_Old: any;
  Feed_New: any;

  LessLength: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider: TestapiProvider,
    public storage: Storage, public loadingCtrl: LoadingController) {

    this.Course_ID = navParams.get('courseid')
    this.Course_Name = navParams.get('coursename')
    this.Stu_ID = navParams.get('stuid')
    console.log(this.Course_ID, this.Stu_ID)



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResulthistpercPage');
    this.storage.ready().then(() => this.storage.get('today')
      .then(res => {
        console.log('res:', res);
        this.TodayStorage = res;
        this.GetLessonFeed();

      }).then(() => console.log("Todaystorage: ", this.TodayStorage)
      ));
  }

  GetLessonFeed() {
    this.SendLessonRequest = from(this.testapiProvider.GetLessonFeed(this.TodayStorage, this.Course_ID, this.Stu_ID))
    this.SendLessonRequest.subscribe(val => {
      console.log(val)
      this.Less_ID = val["Less_ID"]
      this.Less_Know = val["Less_Know"]
      this.Feed_Type = val["Feed_Type"]
      this.Feed_Text = val["Feed_Text"]
      this.Feed_Date = val["Feed_Date"]
      this.Feed_Old = val["Feed_Old"]
      this.Feed_New = val["Feed_New"]

      this.LessLength = this.Less_ID.length
      console.log(this.Less_ID, this.Feed_Type, this.Feed_Text, this.Feed_Date, this.Feed_Old, this.Feed_New)
    })
  }

  ShowLessFeed(index) {
    console.log(index)
    var CourseID = this.Course_ID[index]
    this.navCtrl.push(ShowlessonfeedPage, {
      'lessID': this.Less_ID[index], 'lessKnow': this.Less_Know[index],
      'feedType': this.Feed_Type[index], 'feedText': this.Feed_Text[index], 'feedDate': this.Feed_Date[index], 'feedOld': this.Feed_Old[index],
      'feedNew': this.Feed_New[index]
    });
  }



}

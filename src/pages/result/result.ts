import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ActionSheetController, Platform, ViewController } from 'ionic-angular';
import { ResulthistpercPage } from '../resulthistperc/resulthistperc';


//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';
import { TabsPage } from '../tabs/tabs';
import { CoursemenuPage } from '../coursemenu/coursemenu';


/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {


  CourseInfo: any;
  Stu_ID: any;
  SentStu_ID: any;

  //Display Course
  Course = [];
  Course_ID: any;
  Course_Code: any;
  Course_Name: any;
  Course_Exist: boolean

  //Display Course in Joining

  JCourse = []
  JCourse_ID: any;
  JCourse_Code: any;
  JCourse_Name: any;

  //Course input from Alert & API
  InputCourseID: any;
  SendCourseID: any;
  CourseExist: any;
  COSExist: any;
  SendRequestGetJoinCourse: any;


  SplitPCID: any;
  SplitPCCODE: any;
  SplitPCNAME: any;

  //Toast
  ToastChecker: number = 3; //0:Correect,1:ExistCOS,2:No course in system
  SuccessToast: any;
  RepeatCOSToast: any;
  NoCourseToast: any;
  EmptyInputToast: any;
  prompt: any;
  loading: any;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController,
    public actionSheetController: ActionSheetController, public platform: Platform,
    public viewCtrl:ViewController) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    this.SentStu_ID = this.Stu_ID[0]
    console.log(this.SentStu_ID);



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
    console.log('ionViewDidLoad ResultPage');
    this.GetCourse();
    this.GetJoinCourse();

  }
  GetCourse() {
    this.CourseInfo = from(this.testapiProvider.GetCourse(this.Stu_ID));
    this.CourseInfo.subscribe(val => {

      console.log(val)
      this.Course_ID = val["Course_ID"]
      this.Course_Code = val["Course_Code"]
      this.Course_Name = val["Course_Name"]
      this.Course_Exist = val["Exist"]
      console.log(this.Course_Code, this.Course_ID, this.Course_Name)

      /*
      var PCID = JSON.stringify(this.Course_ID)
      var PCCODE = JSON.stringify(this.Course_Code)
      var PCNAME = JSON.stringify(this.Course_Name)

      PCCODE = PCCODE.substring(1,PCCODE.length-1)
      PCID = PCID.substring(1,PCID.length-1)
      PCNAME = PCNAME.substring(1,PCNAME.length-1)
      console.log(PCID,PCCODE,PCNAME)
      this.SplitPCID  = PCID.split(",");
      this.SplitPCCODE = PCCODE.split(",");
      this.SplitPCNAME = PCNAME.split(",");
      console.log(this.SplitPCID[0])
      */

      var conditionLength = this.Course_ID.length
      for (var j = 0; j < conditionLength; j++) {
        let temp: string
        temp = this.Course_Code[j] + " " + this.Course_Name[j]
        this.Course.push(temp)
        console.log(this.Course[j])

      }
      console.log(this.Course)

    })

  }
  GetJoinCourse() {
    this.SendRequestGetJoinCourse = from(this.testapiProvider.GetJoinCourse())
    this.SendRequestGetJoinCourse.subscribe(val => {
      console.log(val)
      this.JCourse_ID = val['Course_ID']
      this.JCourse_Code = val["Course_Code"]
      this.JCourse_Name = val["Course_Name"]
      console.log(this.JCourse_ID, this.JCourse_Code, this.JCourse_Name);

      let conditionLength = this.JCourse_ID.length
      for (let j = 0; j < conditionLength; j++) {
        let temp: string
        temp = this.JCourse_Code[j] + " " + this.JCourse_Name[j]
        this.JCourse.push(temp)
        console.log(this.JCourse[j])

      }
      console.log(this.JCourse)


    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: this.JCourse[0],
        icon: 'arrow-dropright-circle',

        handler: () => {
          console.log('Course[0] clicked');
          this.InsertedCourse(this.JCourse_ID[0]);
          this.navCtrl.setRoot(this.navCtrl.getActive().component, { 'Stu_ID': this.Stu_ID });
          //this.navCtrl.setRoot(TabsPage)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  InsertedCourse(courseID) {
    if (this.RepeatCOSToast) {
      this.RepeatCOSToast.dismiss();
      this.RepeatCOSToast = null;
    }
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.SendCourseID = from(this.testapiProvider.JoiningCourse(courseID, this.Stu_ID))
    this.SendCourseID.subscribe(val => {
      console.log(val);
      this.COSExist = val["COSExist"]
      this.CourseExist = val["CourseExist"]

      //Check for the toast case
      if (this.COSExist == false) {

        if (this.CourseExist == true) {
          this.ToastChecker = 0;
          this.loading.dismiss();
        }
        else {
          this.ToastChecker = 2;
          this.loading.dismiss();
        }

      }
      else {
        this.ToastChecker = 1;
        this.loading.dismiss();
        this.RepeatCOSToast = this.toastCtrl.create({
          message: 'This course was already joined by this student.',
          duration: 3000
        });

        this.RepeatCOSToast.present();
      }


    })
  }


  ShowResult(index) {
    console.log(index)
    var CourseID = this.Course_ID[index]
    //this.navCtrl.push(ResulthistpercPage, { 'courseid': CourseID, 'coursename': this.Course_Name[index], 'stuid': this.Stu_ID });
    this.navCtrl.push(CoursemenuPage, { 'courseid': CourseID, 'coursename': this.Course_Name[index], 'stuid': this.Stu_ID });
  }


}

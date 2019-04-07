import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { ResulthistpercPage } from '../resulthistperc/resulthistperc';


//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';


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
  loading:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController,public actionSheetController:ActionSheetController) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    this.SentStu_ID = this.Stu_ID[0]
    console.log(this.SentStu_ID);



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    
  }
  ionViewWillEnter(){
    this.GetCourse();
    this.GetJoinCourse();

  }
  GetCourse(){
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
        temp = "Course : " + this.Course_Code[j] + " " + this.Course_Name[j]
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
  
  /*JoinCourse() {
    let CID: any;
    if (this.prompt) {
      this.prompt.dismiss();
      this.prompt = null;
    }

    this.prompt = this.alertCtrl.create({
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
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('Saved clicked');
            CID = data.CID
            console.log(CID)
            //JoinCourseAPI function()
            this.InsertedCourse(CID);
            switch (this.ToastChecker) {
              case 0: {
                this.SuccessToast = this.toastCtrl.create({
                  message: 'Join Course successful.',
                  duration: 3000
                });

                this.SuccessToast.present();
                break;
              }
              case 1: {
                this.RepeatCOSToast = this.toastCtrl.create({
                  message: 'This course was already joined by this student.',
                  duration: 3000
                });

                this.RepeatCOSToast.present();
                break;
              }
              case 2: {
                this.NoCourseToast = this.toastCtrl.create({
                  message: 'This course is not available in the system.',
                  duration: 3000
                });

                this.NoCourseToast.present();
                break;
              }
              case 3: {
                this.EmptyInputToast = this.toastCtrl.create({
                  message: 'Empty course input.',
                  duration: 3000
                });

                this.EmptyInputToast.present();
                break;
              }

            }
          }
        }
      ]
    });
    this.prompt.present();

  }*/
  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: this.JCourse[0],
        icon: 'arrow-dropright-circle',
      
        handler: () => {
          console.log('Course[0] clicked');
          this.InsertedCourse(this.JCourse_ID[0]);
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
    if(this.loading){
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
    this.navCtrl.push(ResulthistpercPage, { 'courseid': CourseID, 'coursename': this.Course_Name[index], 'stuid': this.Stu_ID });
  }


}

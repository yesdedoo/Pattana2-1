import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
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
  
  
  CourseInfo:any;
  Stu_ID:any;
  SentStu_ID:any;

  //Display Course
  Course=[];
  Course_ID:any;
  Course_Code:any;
  Course_Name:any;
  Course_Exist:boolean

  //Course input from Alert & API
  InputCourseID:any;
  SendCourseID:any;
  CourseExist:any;
  COSExist:any;
   
  SplitPCID:any;
  SplitPCCODE:any;
  SplitPCNAME:any;

  //Toast
  ToastChecker:number =0; //0:Correect,1:ExistCOS,2:No course in system
  SuccessToast:any;
  RepeatCOSToast:any;
  NoCourseToast:any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider,public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,public toastCtrl:ToastController) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    this.SentStu_ID = this.Stu_ID[0]
    console.log(this.SentStu_ID);

    this.SuccessToast = this.toastCtrl.create({
      message: 'Join Course successful.',
      duration: 3000
    }); 
    this.RepeatCOSToast = this.toastCtrl.create({
      message:'This course was already joined by this student.',
      duration: 3000
    });
    this.NoCourseToast = this.toastCtrl.create({
      message:'This course is not available in the system.',
      duration: 3000
    });  
   
    
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      loading.present();
    setTimeout(() => {
      loading.dismiss()
    }, 1000);
    

    this.CourseInfo = from(this.testapiProvider.GetCourse(this.Stu_ID));
    this.CourseInfo.subscribe(val =>{
      
      console.log(val)
      this.Course_ID=val["Course_ID"]
      this.Course_Code=val["Course_Code"]
      this.Course_Name=val["Course_Name"]
      this.Course_Exist=val["Exist"]
      console.log(this.Course_Code,this.Course_ID,this.Course_Name)
          
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
      for(var j=0; j<conditionLength;j++){
        let temp:string
        temp = "Course : " + this.Course_Code[j] + " " + this.Course_Name[j]
        this.Course.push(temp)
        console.log(this.Course[j])
              
      }
      console.log(this.Course)
      
    })
    
  }
  JoinCourse(){
    let CID:any;
    const prompt = this.alertCtrl.create({
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
            this.SuccessToast.present();
            //JoinCourseAPI function()
            switch(this.ToastChecker){
              case 0:{
                this.SuccessToast.present();
                break;
              }
              case 1:{
                this.RepeatCOSToast.present();
                break;
              }
              case 2:{
                this.NoCourseToast.present();
                break;
              }

            }
          }
        }
      ]
    });
    prompt.present();

  }
  InsertedCourse(courseID){
    this.SendCourseID = from(this.testapiProvider.JoiningCourse(courseID,this.Stu_ID))
    this.SendCourseID.subscribe(val =>{
      this.COSExist = val["COSExist"]
      this.CourseExist = val["CourseExist"]

      //Check for the toast case
      if(this.COSExist==false){
        
        if(this.CourseExist==true){
          this.ToastChecker = 0;
        }
        else{
          this.ToastChecker = 2;
        }
        
      }
      else{
        this.ToastChecker = 1;
      }


    })
  }

  
  ShowResult(index)
  {
    console.log(index)
    var CourseID = this.Course_ID[index]  
    this.navCtrl.push(ResulthistpercPage,{'courseid':CourseID,'stuid':this.SentStu_ID});
  }


}

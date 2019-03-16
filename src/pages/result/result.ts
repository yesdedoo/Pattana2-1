import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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

  Course=[];
  Course_ID:any;
  Course_Code:any;
  Course_Name:any;
  Coures_Exist:boolean

  PushedPCID =[];
  
  SplitPCID:any;
  SplitPCCODE:any;
  SplitPCNAME:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider,public loadingCtrl:LoadingController,
    public alertCtrl:AlertController) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    console.log(this.Stu_ID);
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
    

    this.CourseInfo = from(this.testapiProvider.DisplayCourse(this.Stu_ID));
    this.CourseInfo.subscribe(val =>{
      
      console.log(val)
      this.Course_ID=val["Course_ID"]
      this.Course_Code=val["Course_Code"]
      this.Course_Name=val["Course_Name"]
      this.Coures_Exist=val["Exist"]
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
          }
        }
      ]
    });
    prompt.present();

  }

  
  ShowResult(index)
  {
    console.log(index)
    var CourseID = this.SplitPCID[index]  
    this.navCtrl.push(ResulthistpercPage,{'CourseID':CourseID});
  }


}

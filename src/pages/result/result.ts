import { Component } from '@angular/core';
import { NavController, NavParams, CardContent, LoadingController } from 'ionic-angular';
import { ResulthistpercPage } from '../resulthistperc/resulthistperc';

//REST API
import { from } from 'rxjs/observable/from';
import { TestapiProvider } from '../../providers/testapi/testapi';
import { stringify } from '@angular/core/src/render3/util';

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

  PushedPCID =[];
  
  SplitPCID:any;
  SplitPCCODE:any;
  SplitPCNAME:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider: TestapiProvider,public loadingCtrl:LoadingController) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    console.log(this.Stu_ID);
  }

  presentLoadingDefault(){
    
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
      
      var ParsedVal = JSON.stringify(val)
      console.log(ParsedVal)
      var root = JSON.parse(ParsedVal)      
     
      var cc = root[1]
      console.log(cc)

      
      var loopcheck = 0;
      for(var i in root[1]){
        if(loopcheck==0){
          this.Course_Code=root[1][i]
        }
        else if(loopcheck==1){
          this.Course_ID=root[1][i]
        }
        else{
          this.Course_Name = root[1][i]
        }
        loopcheck++;
        console.log(root[1][i])
      }
      console.log(this.Course_Code,this.Course_ID,this.Course_Name)
          

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

      

      var conditionLength = this.SplitPCID.length
      
      for(var j=0; j<conditionLength;j++){
        var temp 
        temp = "Course : " + this.SplitPCCODE[j] + " " + this.SplitPCNAME[j]
        this.Course.push(temp)
        console.log(this.Course[j])
              
      }
      console.log(this.Course)
    })
    
  }

  
  ShowResult(index)
  {
    console.log(index)
    var CourseID = this.SplitPCID[index]  
    this.navCtrl.push(ResulthistpercPage,{'CourseID':CourseID});
  }


}

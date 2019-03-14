import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  Course="";
  Course_ID:any;
  Course_Code:any;
  Course_Name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider: TestapiProvider) {

    this.Stu_ID = this.navParams.get('Stu_ID');
    console.log(this.Stu_ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    this.CourseInfo = from(this.testapiProvider.DisplayCourse(this.Stu_ID));
    this.CourseInfo.subscribe(val =>{
      console.log(val)

      var ParsedVal = JSON.stringify(val)
      var root = JSON.parse(ParsedVal)
      console.log(ParsedVal)
       
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
      var SplitPCID  = PCID.split(",");
      var SplitPCCODE = PCCODE.split(",");
      var SplitPCNAME = PCNAME.split(",");
      console.log(SplitPCID[0])

      var conditionLength = SplitPCID.length
      
      for(var j=0; j<=conditionLength;j++){

        this.Course = this.Course.concat(SplitPCID[j]) 
        console.log(this.Course)
        j++;      
      }
    })
    
  }

  

  Database()
  {
    this.navCtrl.push(ResulthistpercPage);
  }


}

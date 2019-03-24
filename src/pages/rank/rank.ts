import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CardPage } from '../card/card';
import { Storage } from '@ionic/storage';
//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  Rankingother: Array <any> =[];
  Rankingme: Array <any> =[];

  //Get pushed from quiz.ts
  ScoreCount: any;
  ShowScore:any;
  NOOfQues:any;
  
  Today:any;

  //REST variables
  SendRankingRequest:any;
  RankStu_ID:any;
  RankName:any;
  RankScore:any;

  constructor(public alertCtrl: AlertController, private navCtrl: NavController, public navParams: NavParams,
    public testapiProvider:TestapiProvider,public storage:Storage) {
    this.Rankingother= ["Kamonruk Sariyarsheeva","Suvijak Permpholphattana","Prakitchai Panphila"]
    this.Rankingme = ["Pakpoom Rachtracho"]
    this.ScoreCount = navParams.get('scorecount');
    this.NOOfQues = navParams.get('quesNO');
    this.ShowScore = navParams.get('showscore');
    this.Today = navParams.get('today');
    

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankPage');
    this.GetRanking();
  }

  GetRanking(){
    this.SendRankingRequest = from(this.testapiProvider.GetRanking(this.Today))
    this.SendRankingRequest.subscribe(val =>{
      console.log(val)
      this.RankStu_ID = val["Stu_ID"]
      this.RankName = val["Name"]
      this.RankScore = val["RankedScore"]
      
      console.log(this.RankStu_ID,this.RankName,this.RankScore)
      
    })

  }


  clickhome()
  {
    //this.navCtrl.push(HomePage)
    this.navCtrl.setRoot(TabsPage)
  }
 

  ToPageCard() {
    this.navCtrl.push(CardPage)
  }


}

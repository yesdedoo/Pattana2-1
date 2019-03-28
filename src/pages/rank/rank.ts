import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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


  //Get pushed from quiz.ts
  ScoreCount: any;
  ShowScore: any;
  NOOfQues: any;

  ParseSC: number;
  DecimalSC: any;
  loading:any;
  Today: any;

  //REST variables
  SendRankingRequest: any;
  RankStu_ID: any;
  RankName: any = [];
  RankScore: any = [];
  OwnRank: any;
  OwnName: any;
  OwnScore: any;

  RankSlot = [0, 1, 2, 3, 4];

  //Storage variable
  TodayStorage: any;
  Ass_IDStorage: any;
  Stu_IDStorage: any;

  constructor(public alertCtrl: AlertController, private navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider, public storage: Storage, public loadingCtrl: LoadingController) {

    this.ScoreCount = navParams.get('scorecount');
    this.NOOfQues = navParams.get('quesNO');
    this.ShowScore = navParams.get('showscore');
    this.ParseSC = parseFloat(this.ShowScore);
    this.DecimalSC = this.ParseSC.toFixed(2);
    this.Today = navParams.get('today');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner:'hide'
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankPage');

    //this.GetRanking();

    this.storage.ready().then(() => this.storage.get('stuid')
      .then(res => {
        console.log('stuid got:', res);
        this.Stu_IDStorage = res[0];
      }).then(() => console.log("Stuidstorage: ", this.Stu_IDStorage))
    );
    this.storage.ready().then(() => this.storage.get('today')
      .then(res => {
        console.log('today got:', res);
        this.TodayStorage = res;
      }).then(() => console.log("Todaystorage: ", this.TodayStorage))
    );
    this.storage.ready().then(() => this.storage.get('assid')
      .then(res => {
        console.log('assid got:', res);
        this.Ass_IDStorage = res;
        //this.GetRanking();
      }).then(() => console.log("Assstorage: ", this.Ass_IDStorage))
    );
         
    this.loading.present();
    setTimeout(() => {
      this.GetRanking();
      this.loading.dismiss();

    }, 1000);


  }

  GetRanking() {
    console.log(this.Ass_IDStorage);
    this.SendRankingRequest = from(this.testapiProvider.GetRanking(this.Today, this.Ass_IDStorage, this.Stu_IDStorage))
    this.SendRankingRequest.subscribe(val => {
      console.log(val)
      this.RankStu_ID = val["Stu_ID"]
      this.RankName = val["Name"]
      this.RankScore = val["RankedScore"]
      this.OwnRank = val["OwnRank"]
      this.OwnName = val["OwnName"]
      this.OwnScore = val["OwnScore"]

      console.log("REST Rank", this.RankStu_ID, this.RankName, this.RankScore)
      //console.log("REST Ownrank", this.OwnRank, this.OwnName, this.OwnScore)


    })

  }


  clickhome() {
    //this.navCtrl.push(HomePage)
    this.navCtrl.setRoot(TabsPage)
  }




}

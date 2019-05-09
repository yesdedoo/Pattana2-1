import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform, ViewController } from 'ionic-angular';
import { CardPage } from '../card/card';
import { Storage } from '@ionic/storage';
//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { TabsPage } from '../tabs/tabs';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';


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
  loading: any;
  Today: any;

  //REST variables
  SendRankingRequest: any;
  RankShowQuesRequest: any;
  RankStu_ID: any;
  RankName: any = [];
  RankScore: any = [];
  OwnRank: any;
  OwnName: any;
  OwnScore: any;
  Quesname: any = [];
  QuesAns: any = [];
  QuesCrr: any = [];

  RankSlot = [0, 1, 2, 3, 4];

  //Storage variable
  TodayStorage: any;
  Ass_IDStorage: any;
  Stu_IDStorage: any;

  //Modal
  modal: any;
  btn: any;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;


  constructor(public alertCtrl: AlertController, private navCtrl: NavController, public navParams: NavParams,
    public testapiProvider: TestapiProvider, public storage: Storage, public loadingCtrl: LoadingController,
    public smartAudio: SmartAudioProvider, public platform: Platform, public viewCtrl: ViewController) {

    this.ScoreCount = navParams.get('scorecount');
    this.NOOfQues = navParams.get('quesNO');
    this.ShowScore = navParams.get('showscore');
    this.ParseSC = parseFloat(this.ShowScore);
    this.DecimalSC = this.ParseSC.toFixed(2);
    this.Today = navParams.get('today');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'hide'
    });


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RankPage');
    // Get the modal
    this.modal = document.getElementsByClassName("modal")[0];
    console.log(this.modal)
    //this.GetRanking();

    this.storage.ready().then(() => this.storage.get('stuid')
      .then(res => {
        console.log('stuid got:', res);
        this.Stu_IDStorage = res;
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
  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }
  ionViewWillEnter() {
    this.smartAudio.stop('bg7Sound');
    this.viewCtrl.showBackButton(false);
    this.initializeBackButtonCustomHandler();
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
    this.GetRankShowQues()

  }

  GetRankShowQues(){
    this.RankShowQuesRequest = from(this.testapiProvider.GetRankShowQues(this.Stu_IDStorage,this.Today))
    this.RankShowQuesRequest.subscribe(val=>{
      this.Quesname = val["QuesName"];
      this.QuesAns = val["QuesAns"];
      this.QuesCrr = val["QuesCrr"];
    })
  }

  DisplayModalShowQues() {
    this.modal.style.display = "block";
  }
  HideModalShowQues() {
    this.modal.style.display = "none";
  }


  clickhome() {
    //this.navCtrl.push(HomePage)
    this.navCtrl.setRoot(TabsPage)
  }




}

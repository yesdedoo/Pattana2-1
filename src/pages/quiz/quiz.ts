import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform, ViewController } from 'ionic-angular';
import { RankPage } from '../rank/rank';

//Slide
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { Storage } from '@ionic/storage';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild(Slides) slides: Slides;
  //Rest variable
  Stu_ID: any;
  SentStu_ID: any;

  Today: any;
  TodayStorage: any;
  SendQuestionRequest: any
  SendChoiceRequest: any;
  SendMarkResult: any;

  //Get Question
  Ques_ID: any = [];
  Ques_Name: any;
  Ques_FB: any;
  Ques_Ass: any;

  ShowQues: any = []

  //Get Choice
  Choice_ID: any = [];
  Choice_Name: any = [];
  Choice_Crr: any = [];
  Choice_Quesid: any = [];
  ArrChoice = [];

  //Marking Score 
  MarkingResult = { "MQuesNO": 0, "MResult": 0 };
  RepeatSelected = { "Selected": false, "RQuesNO": 20 }
  RepeatCCheck = [];
  RepeatQCheck = [];
  ButtonColorCorrect = '#8cc63f';
  ButtonColorWrong = '#ff0000';
  ButtonColorWhite = '#ffffff';

  //Timer
  responseTime: number = 0;
  limitTime = 30;
  realScore: number = 0;
  ScoreCount: any;
  ShowScore = 0;
  Timer: any;
  minuteTimer: number;

  buttonToChange1 = []
  buttonToChange2 = []
  buttonToChange3 = []
  buttonToChange4 = []

  loading: any;
  musicChecker: boolean = true;
  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;




  constructor(public navCtrl: NavController, public navParams: NavParams, public testapiProvider: TestapiProvider,
    public loadingCtrl: LoadingController, public storage: Storage, public smartAudio: SmartAudioProvider,
    public platform: Platform, public viewCtrl: ViewController) {

    //var Yanap = window.cordova
    this.ScoreCount = 0;
    this.Stu_ID = navParams.get('Stu_ID')
    //this.SentStu_ID = this.Stu_ID[0]
    this.loading = loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'circles'
    });



    this.storage.ready().then(() => this.storage.get('today')
      .then(res => {
        console.log('res:', res);
        this.TodayStorage = res;

      }).then(() => console.log("Todaystorage: ", this.TodayStorage)
      ));
    this.storage.ready().then(() => this.storage.get('stuid')
      .then(res => {
        console.log('res:', res);
        this.SentStu_ID = res;

      }).then(() => console.log("Stuidstorage: ", this.SentStu_ID)
      ));



    this.Today = navParams.get('Today')
    console.log("Pushed data", this.Stu_ID, this.Today, this.SentStu_ID);



  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.initializeBackButtonCustomHandler();

    this.GetQuestion();
    setTimeout(() => {
      this.loading.present();
      this.GetChoice();
      this.GetButtonID();
      this.StartTimer();
      this.smartAudio.play('bg8Sound');
      setInterval(() => {
        if (this.musicChecker == true) {
          this.smartAudio.play('bg8Sound');
        }
      }, 11000)

    }, 1000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
    //this.slides.lockSwipes(true);

  }



  finishquiz() {
    clearInterval(this.Timer)
    this.musicChecker = false;
    this.navCtrl.push(RankPage, { scorecount: this.ScoreCount, quesNO: this.Ques_ID.length, showscore: this.ShowScore, today: this.Today });

  }

  GetQuestion() {

    this.SendQuestionRequest = from(this.testapiProvider.ImportQuestion(this.Stu_ID, this.Today))

    this.SendQuestionRequest.subscribe(val => {

      console.log("REST Question", val)
      this.Ques_ID = val["Ques_ID"]
      this.Ques_Name = val["Ques_Name"]
      this.Ques_FB = val["Ques_FB"]
      this.Ques_Ass = val["Ques_Ass"]
      //setTimeout(() => {
      console.log("Splited REST", this.Ques_ID, this.Ques_Name, this.Ques_FB)

      //}, 3500);


    })

  }

  GetChoice() {


    var conditionLength = this.Ques_ID.length
    var tempCID = [], tempCNAME = [], tempCCRR = [], tempCQID = [], tempChoice = []


    for (let i = 0; i < conditionLength; i++) {

      this.SendChoiceRequest = from(this.testapiProvider.GetChoice(this.Ques_ID[i]))
      console.log("Lopp Choice", this.Ques_ID[i])

      this.SendChoiceRequest.subscribe(val => {
        console.log("REST Choice", val)
        tempChoice[i] = val
        tempCID[i] = tempChoice[i]["Choice_ID"]
        tempCNAME[i] = tempChoice[i]["Choice_Name"]
        tempCCRR[i] = tempChoice[i]["Choice_Crr"]
        tempCQID[i] = tempChoice[i]["Choice_QuesID"]

        console.log("temp :", tempCID[i], tempCNAME[i], tempCCRR[i], tempCQID[i])
        console.log(tempChoice)

      })
      setTimeout(() => {
        this.Choice_ID[i] = tempCID[i]
        this.Choice_Name[i] = tempCNAME[i]
        this.Choice_Crr[i] = tempCCRR[i]
        this.Choice_Quesid[i] = tempCQID[i]

      }, 1000);


    }
    setTimeout(() => {
      console.log("Choice: ", this.Choice_ID, this.Choice_Name, this.Choice_Crr, this.Choice_Quesid)


      for (let i = 0; i < conditionLength; i++) {
        let stringifyChoiceName = JSON.stringify(this.Choice_Name[i])
        let trimedSCN = stringifyChoiceName.substring(1, stringifyChoiceName.length - 1)
        let splitedSCN = trimedSCN.split(",");

        for (let j = 0; j < splitedSCN.length; j++) {
          //this.ArrChoice.push(splitedSCN[j])
          let temp = splitedSCN[j].substr(1, splitedSCN[j].length - 2);
          let temp2 = temp.charAt(0).toUpperCase() + temp.slice(1);
          this.ArrChoice.push(temp2);
        }

      }


      setTimeout(() => {
        this.loading.dismiss();
        console.log("Merged choice", this.ArrChoice)

      }, 1000);

    }, 5000);


  }


  GetButtonID() {


    for (let i = 0; i < this.Ques_ID.length; i++) {
      this.buttonToChange1[i] = document.querySelector('#Butt' + (4 * (i + 1) - 4));
      this.buttonToChange2[i] = document.querySelector('#Butt' + (4 * (i + 1) - 3));
      this.buttonToChange3[i] = document.querySelector('#Butt' + (4 * (i + 1) - 2));
      this.buttonToChange4[i] = document.querySelector('#Butt' + (4 * (i + 1) - 1));

      this.RepeatCCheck[i] = new Array(4)
      this.RepeatCCheck[i][0] = false;
      this.RepeatCCheck[i][1] = false;
      this.RepeatCCheck[i][2] = false;
      this.RepeatCCheck[i][3] = false;

      this.RepeatQCheck[i] = false;
    }

    console.log(this.buttonToChange1)
    console.log(this.buttonToChange2)
    console.log(this.buttonToChange3)
    console.log(this.buttonToChange4)


  }

  //Need fix
  MarkingScore(IndexQues: number, IndexChoice: number) {
    console.log("Selectd Q&C", IndexQues, IndexChoice)
    this.MarkingResult["MQuesNO"] = IndexQues
    //this.RepeatSelected["Selected"]=false;

    //Create 2d for IndexChoice
    if (this.RepeatSelected["RQuesNO"] != IndexQues && this.RepeatCCheck[IndexQues][IndexChoice] == false && this.RepeatQCheck[IndexQues] == false) {
      console.log("Selected the choice")
      if (this.Choice_Crr[IndexQues][IndexChoice] == 1) {
        this.MarkingResult["MResult"] = 100;

        setTimeout(() => {
          switch (IndexChoice) {
            case 0: {
              this.buttonToChange1[IndexQues].style.backgroundColor = this.ButtonColorCorrect
              console.log(this.MarkingResult["MResult"])
              if (this.responseTime < this.limitTime) {
                this.realScore = (1000 * (1 - ((this.responseTime / this.limitTime) / 2)));
              }
              else {
                this.realScore = 500;
              }
              console.log(this.realScore);
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ScoreCount++;
              this.ShowScore = this.ShowScore + this.realScore;
              this.realScore = 0;
              this.responseTime = 0
              this.correctSound();


              this.GotoNextSlide();


              break;
            }
            case 1: {
              this.buttonToChange2[IndexQues].style.backgroundColor = this.ButtonColorCorrect
              if (this.responseTime < this.limitTime) {
                this.realScore = (1000 * (1 - ((this.responseTime / this.limitTime) / 2)));
              }
              else {
                this.realScore = 500;
              }
              console.log(this.realScore);
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ScoreCount++;
              this.ShowScore = this.ShowScore + this.realScore;
              this.realScore = 0;
              this.responseTime = 0
              this.correctSound();

              this.GotoNextSlide();

              break;
            }
            case 2: {
              this.buttonToChange3[IndexQues].style.backgroundColor = this.ButtonColorCorrect
              if (this.responseTime < this.limitTime) {
                this.realScore = (1000 * (1 - ((this.responseTime / this.limitTime) / 2)));
              }
              else {
                this.realScore = 500;
              }
              console.log(this.realScore)
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ScoreCount++;
              this.ShowScore = this.ShowScore + this.realScore;
              this.realScore = 0;
              this.responseTime = 0
              this.correctSound();

              this.GotoNextSlide();

              break;
            }
            case 3: {
              this.buttonToChange4[IndexQues].style.backgroundColor = this.ButtonColorCorrect
              if (this.responseTime < this.limitTime) {
                this.realScore = (1000 * (1 - ((this.responseTime / this.limitTime) / 2)));
              }
              else {
                this.realScore = 500;
              }

              console.log(this.realScore)
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ScoreCount++;
              this.ShowScore = this.ShowScore + this.realScore;
              this.realScore = 0;
              this.responseTime = 0
              this.correctSound();

              this.GotoNextSlide();

              break;
            }

          }
        }, 500);


      }
      else {
        this.MarkingResult["MResult"] = 0;


        setTimeout(() => {
          switch (IndexChoice) {
            case 0: {
              this.buttonToChange1[IndexQues].style.backgroundColor = this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ShowScore = this.ShowScore + this.realScore;
              this.responseTime = 0
              this.incorrectSound();

              this.GotoNextSlide();


              break;
            }
            case 1: {
              this.buttonToChange2[IndexQues].style.backgroundColor = this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ShowScore = this.ShowScore + this.realScore;
              this.responseTime = 0
              this.incorrectSound();

              this.GotoNextSlide();

              break;
            }
            case 2: {
              this.buttonToChange3[IndexQues].style.backgroundColor = this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ShowScore = this.ShowScore + this.realScore;
              this.responseTime = 0
              this.incorrectSound();

              this.GotoNextSlide();

              break;
            }
            case 3: {
              this.buttonToChange4[IndexQues].style.backgroundColor = this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"], this.Ques_ID[IndexQues], this.Today, this.SentStu_ID, this.realScore, this.Ques_Ass[IndexQues]))
              this.ShowScore = this.ShowScore + this.realScore;
              this.responseTime = 0
              this.incorrectSound();

              this.GotoNextSlide();

              break;
            }

          }
        }, 500);



      }
      this.RepeatCCheck[IndexQues][IndexChoice] = true;
      this.RepeatQCheck[IndexQues] = true;
      console.log(this.MarkingResult)

    }
    else {
      this.RepeatSelected["RQuesNO"] = IndexQues
      console.log("Unable to select multiple choice")
    }
  }
  StartTimer() {
    this.Timer = setInterval(() => {  // <-----
      console.log("QUESTION TIME: " + this.responseTime);
      this.responseTime++
      //this.minuteTimer = Math.abs(this.responseTime - 60);
      if (this.responseTime >= 60) {

        this.responseTime = 0;
        this.GotoNextSlide();

      }
    }, 1000);

  }

  GotoNextSlide() {


    //setTimeout(() => {
    this.slides.slideNext(5000);
    //}, 1000);
    //this.slides.lockSwipes(true);

  }

  clickSound() {
    this.smartAudio.play('clickSound');
  }
  correctSound() {
    this.smartAudio.play('correctSound');
  }
  incorrectSound() {
    this.smartAudio.play('incorrectSound');
  }

}

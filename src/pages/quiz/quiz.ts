import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RankPage } from '../rank/rank';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';

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

  //Rest variable
  Stu_ID:any;
  SentStu_ID:any;
 
  Today:any;
  SendQuestionRequest:any
  SendChoiceRequest:any;
  SendMarkResult:any;

  //Get Question
  Ques_ID:any=[];
  Ques_Name:any;
  Ques_FB:any;

  //Get Choice
  Choice_ID:any=[];
  Choice_Name:any=[];
  Choice_Crr:any=[];
  Choice_Quesid:any=[];

  //Marking Score 
  MarkingResult={"MQuesNO":0,"MResult":0};
  RepeatSelected={"Selected":false,"RQuesNO":11}
  ButtonColorCorrect='#8cc63f';
  ButtonColorWrong='#ff0000';
  ButtonColorWhite='#ffffff';
  responseTime:number=0;
  limitTime=30;
  realScore:number=0;
  ScoreCount: any;
  ShowScore=0;


  
  buttonToChange1:HTMLElement
  buttonToChange2:HTMLElement
  buttonToChange3:HTMLElement
  buttonToChange4:HTMLElement

  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider: TestapiProvider,public loadingCtrl: LoadingController) {
  
    this.ScoreCount = 0;

    this.Stu_ID = navParams.get('Stu_ID')
    this.SentStu_ID = this.Stu_ID[0]

    this.Today = navParams.get('Today')
    console.log(this.Stu_ID,this.Today,this.SentStu_ID);
  }
  
  

  finishquiz(){
    this.navCtrl.push(RankPage,{scorecount: this.ScoreCount,quesNO:this.Ques_ID.length,showscore:this.ShowScore});
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad QuizPage');

    this.GetQuestion()
    setTimeout(() => {
    this.GetChoice() 
    this.GetButtonID()
    }, 3000);  
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      loading.present();
    setTimeout(() => {
      loading.dismiss()
      setInterval(() => {  // <-----
          console.log("QUESTION TIME: " + this.responseTime); 
          this.responseTime++
  
      }, 1000);
  
    }, 5000);

    
    
    
  }
  GetQuestion(){
    this.SendQuestionRequest = from(this.testapiProvider.ImportQuestion(this.Stu_ID,this.Today))
    this.SendQuestionRequest.subscribe(val =>{
      console.log(val)
      this.Ques_ID = val["Ques_ID"]
      this.Ques_Name = val["Ques_Name"]
      this.Ques_FB = val["Ques_FB"]
      console.log(this.Ques_ID,this.Ques_Name,this.Ques_FB)

    })
 
  }
  GetChoice(){
    
    console.log(this.Ques_ID[0]) 
    var conditionLength = this.Ques_ID.length
    var tempCID,tempCNAME,tempCCRR,tempCQID

    for(let i=0; i<conditionLength;i++){
      
      this.SendChoiceRequest = from(this.testapiProvider.GetChoice(this.Ques_ID[i]))
      console.log(this.Ques_ID[i])
     
      this.SendChoiceRequest.subscribe(val=>{
        console.log(val)
          tempCID = val["Choice_ID"]
          tempCNAME = val["Choice_Name"]
          tempCCRR = val["Choice_Crr"]
          tempCQID = val["Choice_QuesID"]
                 

      })
      setTimeout(() => {
        this.Choice_ID = tempCID
        this.Choice_Name = tempCNAME
        this.Choice_Crr = tempCCRR
        this.Choice_Quesid = tempCQID

      }, 3000);
      
     
    }
    setTimeout(() => {
      console.log(this.Choice_ID,this.Choice_Name,this.Choice_Crr,this.Choice_Quesid)  
    }, 3000);    
    

  }
  GetButtonID(){
    this.buttonToChange1 = document.querySelector('#Butt1');
    this.buttonToChange2 = document.querySelector('#Butt2');
    this.buttonToChange3 = document.querySelector('#Butt3');
    this.buttonToChange4 = document.querySelector('#Butt4');
    console.log(this.buttonToChange1)
    console.log(this.buttonToChange2)
    console.log(this.buttonToChange3)
    console.log(this.buttonToChange4)

  }

  MarkingScore(IndexQues,IndexChoice){
    console.log(IndexQues,IndexChoice)
    this.MarkingResult["MQuesNO"]=IndexQues
    
    if(this.RepeatSelected["RQuesNO"]!=IndexQues&&this.RepeatSelected["Selected"]==false){
      console.log("Selected the choice")
      if(this.Choice_Crr[IndexChoice]==1){
        this.MarkingResult["MResult"] = 100;
        
        setTimeout(() => {
          switch (IndexChoice) {
            case 0:{
              this.buttonToChange1.style.backgroundColor=this.ButtonColorCorrect  
              console.log(this.MarkingResult["MResult"]) 
              if(this.responseTime<this.limitTime){
                this.realScore = (1000*(1-((this.responseTime/this.limitTime)/2)));
              }
              else{
                this.realScore = 500;
              }
              console.log(this.realScore);
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ScoreCount++;
              this.ShowScore= this.ShowScore+this.realScore;
              this.realScore=0;
              IndexQues++;
              break;
            }
            case 1:{
              this.buttonToChange2.style.backgroundColor=this.ButtonColorCorrect
              if(this.responseTime<this.limitTime){
                this.realScore = (1000*(1-((this.responseTime/this.limitTime)/2)));
              }
              else{
                this.realScore = 500;
              }       
              console.log(this.realScore);
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ScoreCount++;
              this.ShowScore= this.ShowScore+this.realScore;
              this.realScore=0;
              IndexQues++;
              break;
            }
            case 2:{
              this.buttonToChange3.style.backgroundColor=this.ButtonColorCorrect
              if(this.responseTime<this.limitTime){
                this.realScore = (1000*(1-((this.responseTime/this.limitTime)/2)));
              }
              else{
                this.realScore = 500;
              }       
              console.log(this.realScore)
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ScoreCount++;
              this.ShowScore= this.ShowScore+this.realScore;
              this.realScore=0;
              IndexQues++;
              break;
            }
            case 3:{
              this.buttonToChange4.style.backgroundColor=this.ButtonColorCorrect
              if(this.responseTime<this.limitTime){
                this.realScore = (1000*(1-((this.responseTime/this.limitTime)/2)));
              }
              else{
                this.realScore = 500;
              }       

              console.log(this.realScore)
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ScoreCount++;
              this.ShowScore= this.ShowScore+this.realScore;
              this.realScore=0;
              IndexQues++;
              break;
            }
            
          }
        }, 500);
        
      }
      else{
        this.MarkingResult["MResult"] = 0;
        
        setTimeout(() => {
          switch (IndexChoice) {
            case 0:{
              this.buttonToChange1.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              IndexQues++;
              break;
            }
            case 1:{
              this.buttonToChange2.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              IndexQues++;
              break;
            }
            case 2:{
              this.buttonToChange3.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              IndexQues++;
              break;
            }
            case 3:{
              this.buttonToChange4.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              IndexQues++;
              break;
            }
            
          }
        }, 500);

      }
      this.RepeatSelected["Selected"] = true;
      console.log(this.MarkingResult)
      
    }
    else{
      this.RepeatSelected["RQuesNO"]=IndexQues
      console.log("Unable to select multiple choice")
    }
  }

  ShowResult(index)
  {
    console.log(index)
    var QuesName = this.Ques_Name[index]  
    
  }


}

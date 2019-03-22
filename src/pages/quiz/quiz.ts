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
  
  ShowQues:any=[]

  //Get Choice
  Choice_ID:any=[];
  Choice_Name:any=[];
  Choice_Crr:any=[];
  Choice_Quesid:any=[];

  //Marking Score 
  MarkingResult={"MQuesNO":0,"MResult":0};
  RepeatSelected={"Selected":false,"RQuesNO":11}
  RepeatCheck=[];
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

  quizFlow:Promise<void>;

 

  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider: TestapiProvider,public loadingCtrl: LoadingController) {
  
    this.ScoreCount = 0;

    this.Stu_ID = navParams.get('Stu_ID')
    this.SentStu_ID = this.Stu_ID[0]

    this.Today = navParams.get('Today')
    console.log(this.Stu_ID,this.Today,this.SentStu_ID);
    
      
  }

  

  finishquiz(){
    this.navCtrl.push(RankPage,{scorecount: this.ScoreCount,quesNO:this.Ques_ID.length,showscore:this.ShowScore,today:this.Today});
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad QuizPage');

    
    
    this.GetQuestion()
    setTimeout(() => {
    this.GetChoice() 
    setTimeout(() => {
      this.GetButtonID()

      }, 3000);
    }, 5000);  
    
    
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
  
    }, 7500);

    
    
    
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

  //Need fix
  GetChoice(){
     

    console.log(this.Ques_ID[0]) 
    var conditionLength = this.Ques_ID.length
    var tempCID=[],tempCNAME=[],tempCCRR=[],tempCQID=[],tempChoice=[]
    

    for(let i=0; i<conditionLength;i++){
      
      this.SendChoiceRequest = from(this.testapiProvider.GetChoice(this.Ques_ID[i]))
      console.log(this.Ques_ID[i])
     
      this.SendChoiceRequest.subscribe(val=>{
        console.log(val)
          tempChoice[i] = val
          tempCID[i] = tempChoice[i]["Choice_ID"]
          tempCNAME[i] = tempChoice[i]["Choice_Name"]
          tempCCRR[i] = tempChoice[i]["Choice_Crr"]
          tempCQID[i] = tempChoice[i]["Choice_QuesID"]
          /*
          tempCNAME[i] = val["Choice_Name"]
          tempCCRR[i] = val["Choice_Crr"]
          tempCQID[i] = val["Choice_QuesID"]*/
          
          console.log("temp :",tempCID[i],tempCNAME[i],tempCCRR[i],tempCQID[i])
          console.log(tempChoice)

      })
      setTimeout(() => {
        this.Choice_ID[i] = tempCID[i]
        this.Choice_Name[i] = tempCNAME[i]
        this.Choice_Crr[i] = tempCCRR[i]
        this.Choice_Quesid[i] = tempCQID[i]
        
      }, 2000);
      
     
    }
    setTimeout(() => {
      console.log("Choice: ",this.Choice_ID,this.Choice_Name,this.Choice_Crr,this.Choice_Quesid)  
      
      for(let i=0;i<conditionLength;i++){
        
        
        this.ShowQues.push(this.Choice_Name[i]) 
      }
      console.log(this.ShowQues)
  
  
    }, 2000);    

    

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

  //Need fix
  MarkingScore(IndexQues,IndexChoice){
    console.log(IndexQues,IndexChoice)
    this.MarkingResult["MQuesNO"]=IndexQues
    this.RepeatSelected["Selected"]=false;
    
    //Create 2d for IndexChoice
    if(this.RepeatSelected["RQuesNO"]!=IndexQues&&this.RepeatSelected["Selected"]==false){
      console.log("Selected the choice")
      if(this.Choice_Crr[IndexQues][IndexChoice]==1){
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
              
              break;
            }
            case 1:{
              this.buttonToChange2.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              
              break;
            }
            case 2:{
              this.buttonToChange3.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              
              break;
            }
            case 3:{
              this.buttonToChange4.style.backgroundColor=this.ButtonColorWrong
              this.SendMarkResult = from(this.testapiProvider.PostMarkingResult(this.MarkingResult["MResult"],this.Ques_ID[IndexQues],this.Today,this.SentStu_ID,this.realScore))
              this.ShowScore= this.ShowScore+this.realScore;
              
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



}

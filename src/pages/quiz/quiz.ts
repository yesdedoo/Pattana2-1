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


  Ques: Array <any> =[];

  checker1: boolean;
  checker2: boolean;
  checker3: boolean;
  checker4: boolean;
  checker5: boolean;
  checker6: boolean;
  checker7: boolean;
  checker8: boolean;
  checker9: boolean;
  checker10: boolean;

  
  WbuttonColor: string;
  //slide1
  C1buttonColor: string;
  W11buttonColor: string;
  W21buttonColor: string;
  W31buttonColor: string;
  //slide2
  W12buttonColor: string;
  W22buttonColor: string;
  W32buttonColor: string;
  C2buttonColor: string;
  //slide3
  W13buttonColor: string;
  W23buttonColor: string;
  W33buttonColor: string;
  C3buttonColor: string;
  //slide4
  W14buttonColor: string;
  W24buttonColor: string;
  W34buttonColor: string;
  C4buttonColor: string;
  //slide5
  W15buttonColor: string;
  W25buttonColor: string;
  W35buttonColor: string;
  C5buttonColor: string;
  //slide6
  W16buttonColor: string;
  W26buttonColor: string;
  W36buttonColor: string;
  C6buttonColor: string;
  //slide7
  W17buttonColor: string;
  W27buttonColor: string;
  W37buttonColor: string;
  C7buttonColor: string;
  //slide8
  W18buttonColor: string;
  W28buttonColor: string;
  W38buttonColor: string;
  C8buttonColor: string;
  //slide9
  W19buttonColor: string;
  W29buttonColor: string;
  W39buttonColor: string;
  C9buttonColor: string;
  //slide10
  W10buttonColor: string;
  W20buttonColor: string;
  W30buttonColor: string;
  C0buttonColor: string;

  ScoreCount: any;

  //Rest variable
  Stu_ID:any;
  Today:any;
  SendQuestionRequest:any
  SendChoiceRequest:any;

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
  ButtonColor:any;
  ButtonColorCorrect='#8cc63f';
  ButtonColorWrong='#ff0000';

  constructor(public navCtrl: NavController, public navParams: NavParams,public testapiProvider: TestapiProvider,public loadingCtrl: LoadingController) {
  
    this.Ques = [
      "The type of diagram in which the operations are apecified on objects is considered as"
    ]
    /*
    this.checker1 = true;
    this.checker2 = true;
    this.checker3 = true;
    this.checker4 = true;
    this.checker5 = true;
    this.checker6 = true;
    this.checker7 = true;
    this.checker8 = true;
    this.checker9 = true;
    this.checker10 = true;*/
    this.WbuttonColor = '#ff0000';
    this.ScoreCount = 0;

    this.Stu_ID = navParams.get('Stu_ID')
    this.Today = navParams.get('Today')
    console.log(this.Stu_ID,this.Today);
  }
  

  

  finishquiz(){
    this.navCtrl.push(RankPage,{
      data: this.ScoreCount
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad QuizPage');

    this.GetQuestion()
    setTimeout(() => {
    this.GetChoice() 
    }, 3000);  
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      loading.present();
    setTimeout(() => {
      loading.dismiss()
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

      }, 1000);
      
     
    }
    setTimeout(() => {
      console.log(this.Choice_ID,this.Choice_Name,this.Choice_Crr,this.Choice_Quesid)  
    }, 1000);    
    

  }
  MarkingScore(IndexQues,IndexChoice){
    console.log(IndexQues,IndexChoice)
    this.MarkingResult["MQuesNO"]=IndexQues
    
    if(this.RepeatSelected["RQuesNO"]!=IndexQues&&this.RepeatSelected["Selected"]==false){
      console.log("Selected the choice")
      if(this.Choice_Crr[IndexChoice]==1){
        this.MarkingResult["MResult"] = 100;
        this.ButtonColor=true
      }
      else{
        this.MarkingResult["MResult"] = 0;
        this.ButtonColor=false;
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


  /*
  //Slide 1
  Wrong11ButtonColor(){
    if(this.checker1==true){
      this.W11buttonColor = this.WbuttonColor;
      this.checker1 = false;
      
    }
     
  }
  Wrong21ButtonColor(){
    if(this.checker1==true){
      this.W21buttonColor = this.WbuttonColor;
      this.checker1 = false;
    } 
  }
  Wrong31ButtonColor(){
    if(this.checker1==true){
      this.W31buttonColor = this.WbuttonColor;
      this.checker1 = false;
    } 
  }
  Correct1ButtonColor(){
    if(this.checker1==true){
      this.C1buttonColor = '#8cc63f';
      this.checker1=false;
      this.ScoreCount++;
    }
  }
  //Slide 2
  Wrong12ButtonColor(){
    if(this.checker2==true){
      this.W12buttonColor = this.WbuttonColor;
      this.checker2 = false;
    }
     
  }
  Wrong22ButtonColor(){
    if(this.checker2==true){
      this.W22buttonColor = this.WbuttonColor;
      this.checker2 = false;
    } 
  }
  Wrong32ButtonColor(){
    if(this.checker2==true){
      this.W32buttonColor = this.WbuttonColor;
      this.checker2 = false;
    } 
  }
  Correct2ButtonColor(){
    if(this.checker2==true){
      this.C2buttonColor = '#8cc63f';
      this.checker2=false;
      this.ScoreCount++;
    }
  }
  //Slide 3
  Wrong13ButtonColor(){
    if(this.checker3==true){
      this.W13buttonColor = this.WbuttonColor;
      this.checker3 = false;
    }
     
  }
  Wrong23ButtonColor(){
    if(this.checker3==true){
      this.W23buttonColor = this.WbuttonColor;
      this.checker3 = false;
    } 
  }
  Wrong33ButtonColor(){
    if(this.checker3==true){
      this.W33buttonColor = this.WbuttonColor;
      this.checker3 = false;
    } 
  }
  Correct3ButtonColor(){
    if(this.checker3==true){
      this.C3buttonColor = '#8cc63f';
      this.checker3=false;
      this.ScoreCount++;
    }
  }

  //Slide4
  Wrong14ButtonColor(){
    if(this.checker4==true){
      this.W14buttonColor = this.WbuttonColor;
      this.checker4 = false;
    }
     
  }
  Wrong24ButtonColor(){
    if(this.checker4==true){
      this.W24buttonColor = this.WbuttonColor;
      this.checker4 = false;
    } 
  }
  Wrong34ButtonColor(){
    if(this.checker4==true){
      this.W34buttonColor = this.WbuttonColor;
      this.checker4 = false;
    } 
  }
  Correct4ButtonColor(){
    if(this.checker4==true){
      this.C4buttonColor = '#8cc63f';
      this.checker4=false;
      this.ScoreCount++;
    }
  }

  //Slide5
  Wrong15ButtonColor(){
    if(this.checker5==true){
      this.W15buttonColor = this.WbuttonColor;
      this.checker5 = false;
    }
     
  }
  Wrong25ButtonColor(){
    if(this.checker5==true){
      this.W25buttonColor = this.WbuttonColor;
      this.checker5 = false;
    } 
  }
  Wrong35ButtonColor(){
    if(this.checker5==true){
      this.W35buttonColor = this.WbuttonColor;
      this.checker5 = false;
    } 
  }
  Correct5ButtonColor(){
    if(this.checker5==true){
      this.C5buttonColor = '#8cc63f';
      this.checker5=false;
      this.ScoreCount++;
    }
  }

  //Slide6
  Wrong16ButtonColor(){
    if(this.checker6==true){
      this.W16buttonColor = this.WbuttonColor;
      this.checker6 = false;
    }
     
  }
  Wrong26ButtonColor(){
    if(this.checker6==true){
      this.W26buttonColor = this.WbuttonColor;
      this.checker6 = false;
    } 
  }
  Wrong36ButtonColor(){
    if(this.checker6==true){
      this.W36buttonColor = this.WbuttonColor;
      this.checker6 = false;
    } 
  }
  Correct6ButtonColor(){
    if(this.checker6==true){
      this.C6buttonColor = '#8cc63f';
      this.checker6=false;
    }
  }

  //Slide7
  Wrong17ButtonColor(){
    if(this.checker7==true){
      this.W17buttonColor = this.WbuttonColor;
      this.checker7 = false;
    }
     
  }
  Wrong27ButtonColor(){
    if(this.checker7==true){
      this.W27buttonColor = this.WbuttonColor;
      this.checker7 = false;
    } 
  }
  Wrong37ButtonColor(){
    if(this.checker7==true){
      this.W37buttonColor = this.WbuttonColor;
      this.checker7 = false;
    } 
  }
  Correct7ButtonColor(){
    if(this.checker7==true){
      this.C7buttonColor = '#8cc63f';
      this.checker7=false;
    }
  }

  //Slide8
  Wrong18ButtonColor(){
    if(this.checker8==true){
      this.W18buttonColor = this.WbuttonColor;
      this.checker8 = false;
    }
     
  }
  Wrong28ButtonColor(){
    if(this.checker8==true){
      this.W28buttonColor = this.WbuttonColor;
      this.checker8 = false;
    } 
  }
  Wrong38ButtonColor(){
    if(this.checker8==true){
      this.W38buttonColor = this.WbuttonColor;
      this.checker8 = false;
    } 
  }
  Correct8ButtonColor(){
    if(this.checker8==true){
      this.C8buttonColor = '#8cc63f';
      this.checker8=false;
    }
  }

  //Slide9
  Wrong19ButtonColor(){
    if(this.checker9==true){
      this.W19buttonColor = this.WbuttonColor;
      this.checker9 = false;
    }
     
  }
  Wrong29ButtonColor(){
    if(this.checker9==true){
      this.W29buttonColor = this.WbuttonColor;
      this.checker9 = false;
    } 
  }
  Wrong39ButtonColor(){
    if(this.checker9==true){
      this.W39buttonColor = this.WbuttonColor;
      this.checker9 = false;
    } 
  }
  Correct9ButtonColor(){
    if(this.checker9==true){
      this.C9buttonColor = '#8cc63f';
      this.checker9=false;
    }
  }

  //Slide10
  Wrong10ButtonColor(){
    if(this.checker10==true){
      this.W10buttonColor = this.WbuttonColor;
      this.checker10 = false;
    }
     
  }
  Wrong20ButtonColor(){
    if(this.checker10==true){
      this.W20buttonColor = this.WbuttonColor;
      this.checker10 = false;
    } 
  }
  Wrong30ButtonColor(){
    if(this.checker10==true){
      this.W30buttonColor = this.WbuttonColor;
      this.checker10 = false;
    } 
  }
  Correct0ButtonColor(){
    if(this.checker10==true){
      this.C0buttonColor = '#8cc63f';
      this.checker10=false;
    }
  }*/

}

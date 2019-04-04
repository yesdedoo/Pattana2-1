import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TestapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestapiProvider {

  data: any
  check:any

  //Which IP and what is it purpose
  //Port 5001
  restApiQuestion = 'http://35.247.168.241:5001/question'
  restApiAssessment = 'http://35.247.168.241:5001/assessment'
  restApiChoice = 'http://35.247.168.241:5001/choice'
  //Port 5002
  restApiRegister = 'http://35.247.168.241:5002/register'
  restApiLogin = 'http://35.247.168.241:5002/login'
  restApiLogout = 'http://35.247.168.241:5002/logout'
  //Port 5003
  restApiCourse = 'http://35.247.168.241:5003/course'
  restApiJoinCourse = 'http://35.247.168.241:5003/joincourse'
  restApiLesson = 'http://35.247.168.241:5003/lesson'
  restApiRanking = 'http://35.247.168.241:5003/ranking'
  //Port 5004
  restApiShowFeedback = 'http://35.247.168.241:5004/showfeedback'
  restApiLessonFeed = 'http://35.247.168.241:5004/lessonFeed' 
  restApiMarkingResult = 'http://35.247.168.241:5004/marking'

  ///////////////////////////


  constructor(public http: HttpClient) {
    console.log('Hello TestapiProvider Provider');
  }


  JoiningCourse(CourseID,Stu_ID){
    var data = {CourseIDData : {courseid:CourseID,stuid:Stu_ID}}
    return new Promise(resolve =>{
      fetch(this.restApiJoinCourse,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });
  }
  
  GetAssessment(Date,Stu_ID){
    var data = {dateData : {date:Date,stuid:Stu_ID}}
    return new Promise(resolve =>{
      fetch(this.restApiAssessment,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });
  }

  //Include data from DB
  ImportQuestion(Stu_id,Today)
  {
    //var that get data from DB
    var data = {questionData : {stuid:Stu_id,today:Today}}
    return new Promise(resolve =>{
      fetch(this.restApiQuestion,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });
  }

  GetChoice(Ques_ID)
  {
    //var that get data from DB
    var data = {choiceData : {choicequesid:Ques_ID}}
    return new Promise(resolve =>{
      fetch(this.restApiChoice,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });
  }
  
  PostMarkingResult(Result,Ques_ID,Ques_Date,Stu_ID,Testscore) {
    //Registration data from register page
    var data = { MarkingData: { result:Result,quesid:Ques_ID,quesdate:Ques_Date,stuid:Stu_ID,testscore:Testscore} }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiMarkingResult, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    });


  }

  //INSERT the registration
  
  PostRegister(fName,lName,Email,Password)
  {
    
    //Registration data from register page
    var data = {registerData : {fname:fName,lname:lName,email:Email,pwd:Password,exist:this.check}}
    //To check the existing account
    return new Promise(resolve =>{
      fetch(this.restApiRegister,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
    });
  }
  CheckLogin(Email, Password) {

    //Check the login input from html page
    var data = { loginData: { email: Email, pwd: Password, exist: this.check } }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiLogin, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(r=>{
            this.data = r.json()
            resolve(this.data)
          })
          .catch(err => console.log(err))
    });

  }
  PushLogLogout(Stu_ID){
    var data = {logoutData : {stuid:Stu_ID}}
    return new Promise(resolve =>{
      fetch(this.restApiLogout,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
    });
  }

  GetCourse(Stu_ID){
    var data = { stu_IDData: { stu_id: Stu_ID} }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiCourse, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(r=>{
            this.data = r.json()
            resolve(this.data)
          })
          .catch(err => console.log(err))
    });

  }

  GetLessonFeed(DATE,Course_ID,Stu_ID){ //////////////////////////////////////////////
    var data = { lessonData: { date:DATE,courseid: Course_ID,stuid:Stu_ID} }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiLessonFeed, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(r=>{
            this.data = r.json()
            resolve(this.data)
          })
          .catch(err => console.log(err))
    });

  }
  GetRanking(DATE,Ass_ID,Stu_ID){
    var data = { rankingData: { date:DATE,assid:Ass_ID,stuid:Stu_ID} }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiRanking, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(r=>{
            this.data = r.json()
            resolve(this.data)
          })
          .catch(err => console.log(err))
    });


  }
  GetFeedback(){
    return new Promise(resolve => {
      fetch(this.restApiShowFeedback, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });

  }
  PostFeedbackCal(Stu_ID,Today){
    var data = { postFBData: { stuid:Stu_ID,today:Today} }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiShowFeedback, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(r=>{
            this.data = r.json()
            resolve(this.data)
          })
          .catch(err => console.log(err))
    });


  }
  GetLesson(Course_ID,Stu_ID){
    var data = { lessonData: { courseid: Course_ID,stuid:Stu_ID} }
    //To check the existing account
    return new Promise(resolve => {
      fetch(this.restApiLesson, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(r=>{
            this.data = r.json()
            resolve(this.data)
          })
          .catch(err => console.log(err))
    });

  }



}

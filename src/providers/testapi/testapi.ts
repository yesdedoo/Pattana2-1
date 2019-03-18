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
  restApiQuestion = 'http://104.196.19.248:5001/question'
  restApiAssessment = 'http://104.196.19.248:5001/assessment'
  restApiChoice = 'http://104.196.19.248:5001/choice'
  restApiRegister = 'http://104.196.19.248:5002/register'
  restApiLogin = 'http://104.196.19.248:5002/login'
  restApiCourse = 'http://104.196.19.248:5003/course'
  restApiJoinCourse = 'http://104.196.19.248:5003/joincourse'
  restApiMarkingResult = 'http://104.196.19.248:5003/marking'
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
  
  GetAssessment(Date){
    var data = {dateData : {date:Date}}
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
  
  PostMarkingResult(Result,Ques_ID,Ques_Date,Stu_ID) {
    //Registration data from register page
    var data = { MarkingData: { result:Result,quesid:Ques_ID,quesdate:Ques_Date,stuid:Stu_ID} }
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
  DisplayCourse(Stu_ID){
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

}

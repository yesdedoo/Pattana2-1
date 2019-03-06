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
  restApiChoice = 'http://104.196.19.248:5001/choice'
  restApiRegister = 'http://104.196.19.248:5002/register'

  constructor(public http: HttpClient) {
    console.log('Hello TestapiProvider Provider');
  }

  //Get question & choice from DB
  GetQuestion()
  {
    //var that get data from DB
    
    return new Promise(resolve =>{
      fetch(this.restApiQuestion,{
        method:'GET',
      })
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });
  }
  
  //Include data from DB
  ImportQuestion(Text)
  {
    //var that get data from DB
    var data = {questionData : {text:Text}}
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

  GetChoice()
  {
    //var that get data from DB
    
    return new Promise(resolve =>{
      fetch(this.restApiChoice,{
        method:'GET',
      })
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
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
      .then(r=>{
        this.data = r.json()
        resolve(this.data)
      })
      .catch(err => console.log(err))
    });
  }

}

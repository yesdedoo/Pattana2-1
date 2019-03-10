import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UsernameValidator } from '../../app/validators/username';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';



/**
 * 
 * 
 * 
 * 
 * Generated class for the Login2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  SendLogin: any;
  username: string;
  password: string;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public testapiProvider: TestapiProvider) {

    this.slideOneForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      password: [''],
      age: ['']
    });

   
  }


  registcomplete() {
    this.navCtrl.push(LoginPage)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Login2Page');
  }

  Login(){
    console.log(this.username);
    console.log(this.password);
    this.SendLogin = from(this.testapiProvider.CheckLogin(this.username,this.password))
    this.SendLogin.subscribe(val =>{
      console.log(val)
    })

  }

  loggingin() {
    this.navCtrl.push(TabsPage)
  }
  register() {
    this.navCtrl.push(RegisterPage)
  }

}

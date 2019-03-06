import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UsernameValidator } from '../../providers/username/username';
import { PasswordProvider } from '../../providers/password/password';


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
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  PasswordForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {



    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      privacy: ['', Validators.required]

    });
    this.PasswordForm = formBuilder.group({
      password: ['',Validators.compose([Validators.minLength(6),Validators.required])],
      confirmPassword: ['',Validators.compose([Validators.minLength(6),Validators.required])]
      
    },{
      validator: PasswordProvider.MatchPassword //Pwd validation
    });
  }

  register()
  {
    this.navCtrl.push(LoginPage)
  }


  

  save(){

    this.submitAttempt = true;
    this.navCtrl.push(LoginPage)

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

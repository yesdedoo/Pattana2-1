import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UsernameValidator } from '../../providers/username/username';
import { PasswordProvider } from '../../providers/password/password';

//REST
import { from } from 'rxjs/observable/from'
import { TestapiProvider } from '../../providers/testapi/testapi';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';


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
  SendRegister: any;
  submitAttempt: boolean = false;

  username: string;
  firstname: string;
  lastname: string;
  password: string;
  telephone: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
    public testapiProvider: TestapiProvider, public smartAudio: SmartAudioProvider) {



    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), UsernameValidator.checkUsername],
      telephone: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(12),Validators.required])]

    });
    this.PasswordForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]

    }, {
        validator: PasswordProvider.MatchPassword //Pwd validation
      });
  }

  register() {
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.username);
    console.log(this.password);
    console.log(this.telephone);
    this.SendRegister = from(this.testapiProvider.PostRegister(this.firstname, this.lastname, this.username, this.password,this.telephone))
    this.SendRegister.subscribe(val => {
      console.log(val)
    })
    this.navCtrl.push(LoginPage, { animate: true, animation: 'transition', direction: 'back', duration: 300 })
  }

  clickSound() {
    this.smartAudio.play('clickSound');
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

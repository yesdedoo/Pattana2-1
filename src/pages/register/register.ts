import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';
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
  repassword: string;
  telephone: string;

  FailToast: any;
  EmptyToast: any;
  SuccessToast: any;

  isusername: boolean = false;
  isfirstname: boolean = false;
  islastname: boolean = false;
  ispassword: boolean = false;
  istelephone: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
    public testapiProvider: TestapiProvider, public smartAudio: SmartAudioProvider,
    public toastCtrl: ToastController) {



    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]), UsernameValidator.checkUsername],
      telephone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(12), Validators.required])]

    });
    this.PasswordForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]

    }, {
        validator: PasswordProvider.MatchPassword //Pwd validation
      });
  }

  validate(data) {
    if (data == 'username') {
      this.isusername = true;
    }
    else if (data == 'firstname') {
      this.isfirstname = true;
    }
    else if (data == 'lastname') {
      this.islastname = true;
    }
    else if (data == 'telephone') {
      this.istelephone = true;
    }
    else if (data == 'password') {
      this.ispassword = true;
    }
  }

  register() {
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.username);
    console.log(this.password);
    console.log(this.repassword);
    console.log(this.telephone);
    if (this.FailToast) {
      this.FailToast.dismiss();
      this.FailToast = null;
    }
    if (this.EmptyToast) {
      this.EmptyToast.dismiss();
      this.EmptyToast = null;
    }
    if (this.SuccessToast) {
      this.EmptyToast.dismiss();
      this.EmptyToast = null;
    }

    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.telephone) {
      this.EmptyToast = this.toastCtrl.create({
        message: 'Register failed, empty input',
        duration: 2000
      });
      this.EmptyToast.present();
    }
    else {

      if (this.firstname.length < 6 || this.lastname.length < 6 || this.username.length < 10||this.telephone.length!=10) {
        this.FailToast = this.toastCtrl.create({
          message: 'Register failed, input invalid',
          duration: 2000
        });
        this.FailToast.present()

      }
      else if(this.password.length<6||this.password!=this.repassword){
        this.FailToast = this.toastCtrl.create({
          message: 'Register failed, 1st password & 2nd password are not equal or less than 6',
          duration: 2000
        });
        this.FailToast.present()
      }
      else{
        this.SendRegister = from(this.testapiProvider.PostRegister(this.firstname, this.lastname, this.username, this.password, this.telephone))
        this.SendRegister.subscribe(val => {
          console.log(val)
        })
        this.SuccessToast = this.toastCtrl.create({
          message: 'Register success',
          duration: 2000
        });
        this.SuccessToast.present()
        this.navCtrl.pop();
        //this.navCtrl.push(LoginPage, { animate: true, animation: 'transition', direction: 'back', duration: 300 })
  
      }

    }
  }

  clickSound() {
    this.smartAudio.play('clickSound');
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

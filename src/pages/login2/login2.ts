import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the Login2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
})
export class Login2Page {

  
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        age: ['']
    });

    this.slideTwoForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        privacy: ['', Validators.required],
        bio: ['']
    });

}


  next(){
      this.signupSlider.slideNext();
  }

  prev(){
      this.signupSlider.slidePrev();
  }

  save(){

    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
        this.signupSlider.slideTo(0);
    } 
    else if(!this.slideTwoForm.valid){
        this.signupSlider.slideTo(1);
    }
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
    }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login2Page');
  }

}

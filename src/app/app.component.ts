import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { QuizPage } from '../pages/quiz/quiz';
import { RankPage } from '../pages/rank/rank';
import { CardPage } from '../pages/card/card';
import { CountPage } from '../pages/count/count';
import { JoincoursePage } from '../pages/joincourse/joincourse';
import { ResulthistpercPage } from '../pages/resulthistperc/resulthistperc';
import { ResultPage } from '../pages/result/result';
import { Login2Page } from '../pages/login2/login2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =   Login2Page;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

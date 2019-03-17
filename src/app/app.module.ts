import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Card } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoragePage } from '../pages/storage/storage';
import { ResultPage } from '../pages/result/result';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { JoincoursePage } from '../pages/joincourse/joincourse';
import { SchedulePage } from '../pages/schedule/schedule';
import { ResulthistpercPage } from '../pages/resulthistperc/resulthistperc';
import { QuizPage } from '../pages/quiz/quiz';
import { RankPage } from '../pages/rank/rank';
import { CardPage } from '../pages/card/card';
import { CountPage } from '../pages/count/count';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CalendarModule } from 'ion2-calendar';
import { TestapiProvider } from '../providers/testapi/testapi';
import { UsernameValidator } from '../providers/username/username';
import { PasswordProvider } from '../providers/password/password';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    StoragePage,
    ResultPage,
    LoginPage,
    RegisterPage,
    JoincoursePage,
    SchedulePage,
    ResulthistpercPage,
    QuizPage,
    RankPage,
    CardPage,
    CountPage
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true}),
    RoundProgressModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    StoragePage,
    ResultPage,
    LoginPage,
    RegisterPage,
    JoincoursePage,
    SchedulePage,
    ResulthistpercPage,
    QuizPage,
    RankPage,
    CardPage,
    CountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsernameValidator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TestapiProvider,
    PasswordProvider,
    LocalNotifications,
   
    
    
 
  ]
})
export class AppModule {}

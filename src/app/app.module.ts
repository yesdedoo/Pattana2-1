import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { ResultPageModule } from '../pages/result/result.module';

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
    ResulthistpercPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    ResulthistpercPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

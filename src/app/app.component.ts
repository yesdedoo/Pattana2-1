import { Component } from '@angular/core';
import { App, Platform, AlertController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    smartAudio: SmartAudioProvider, app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      smartAudio.preload('clickSound', 'assets/sound/Click.mp3');
      smartAudio.preload('correctSound', 'assets/sound/Correct.mp3');
      smartAudio.preload('incorrectSound', 'assets/sound/Incorrect.mp3');
      smartAudio.preloadComplex('bg7Sound', 'assets/sound/BG7.mp3');
      smartAudio.preloadComplex('bg8Sound', 'assets/sound/BG8.mp3');

      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNav();
        let activeView: ViewController = nav.getActive();

        if (activeView != null) {
          if (nav.canGoBack()) { //check can we go back?
            //nav.pop();

          } else if (typeof activeView.instance.backButtonAction === 'function') {
            activeView.instance.backButtonAction();
          }

        }

      })

    });
  }
}

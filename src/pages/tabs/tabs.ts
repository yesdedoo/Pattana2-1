import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { StoragePage } from '../storage/storage';
import { ResultPage } from '../result/result';
import { SchedulePage } from '../schedule/schedule';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ResultPage;
  tab3Root = SchedulePage;
  tab4Root = StoragePage;

  constructor() {

  }
}

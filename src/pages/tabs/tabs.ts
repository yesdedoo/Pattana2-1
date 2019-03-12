import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { StoragePage } from '../storage/storage';
import { ResultPage } from '../result/result';
import { SchedulePage } from '../schedule/schedule';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ResultPage;
  tab3Root = SchedulePage;
  tab4Root = StoragePage;

  tab1Params:any;
  tab2Params:any;
  tab3Params:any;
  tab4Params:any;

  TempStu_ID:any;

  constructor(public navParams: NavParams) {
    this.TempStu_ID=this.navParams.get('tempStu_ID')
    this.InitializeParams();
  }

  InitializeParams(){
    this.tab1Params={Stu_ID:this.TempStu_ID};

  }
}

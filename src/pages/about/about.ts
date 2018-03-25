import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  question: string;

  constructor(public platform: Platform, public navCtrl: NavController) {

  }

  parse() {
    
  }
}

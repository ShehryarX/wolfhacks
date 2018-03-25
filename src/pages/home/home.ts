import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  food: any;

  constructor(public navCtrl: NavController, private afdb: AngularFireDatabase) {
    this.load();
  }

  load() {
    this.afdb.list("/-L8TLHWMk4WU080wGILX/").subscribe(_data => {
      this.food = _data[0];
      console.log(this.food[0][0].name);
    });
  }


  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

              type: 'line',
              data: {
                  labels: ["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [
                      {
                          label: "My First dataset",
                          fill: false,
                          lineTension: 0.1,
                          backgroundColor: "rgba(75,192,192,0.4)",
                          borderColor: "rgba(75,192,192,1)",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "rgba(75,192,192,1)",
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(75,192,192,1)",
                          pointHoverBorderColor: "rgba(220,220,220,1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: [65, 59, 80, 81, 56, 55, 40],
                          spanGaps: false,
                      }
                  ]
              }

          });
   
  }

  saveData() {
     this.afdb.list("/").push({
       food: [
         { name: 'Apple', calories: '123' },
         { name: 'Apple', calories: '123' },
       ]
     }).then(response => {
       alert('done');
     });
   }
}

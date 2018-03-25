import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, AngularFireAuth, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseServiceProvider {
  constructor(private angularFire: AngularFire) {

  }

  publiclistAccounts(): FirebaseListObservable<any[]>{
     return this.angularFire.database.list('/accounts');
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pepper';
  cuisines$: AngularFireList<any>;
  cuisines;
  restaurant;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines$ = this.db.list('/cuisines');
    this.cuisines = this.cuisines$.valueChanges();
    this.restaurant = this.db.object('/restaurant').valueChanges();
  }

  add() {
    this.cuisines$.push({
      name: 'Asian',
      details: {
        description: '...'
      }
    });
  }
}

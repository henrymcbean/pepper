import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pepper';
  cuisines$: AngularFireList<any>;
  restaurant$: AngularFireObject<any>;
  cuisines;
  restaurant;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines$ = this.db.list('/cuisines');
    this.restaurant$ = this.db.object('/restaurant');

    this.cuisines = this.cuisines$.valueChanges();
    this.restaurant = this.restaurant$.valueChanges();
  }

  add() {
    this.cuisines$.push({
      name: 'Asian',
      details: {
        description: '...'
      }
    });
  }

  // update() { // Non destructive update.
  //   this.restaurant$.update({
  //     name: 'New Name',
  //     rating: 5
  //   });
  // }

  // update() {  // Destructive update.
  //   this.restaurant$.set({
  //     name: 'New Name',
  //     rating: 5
  //   });
  // }

  update() {  // Destructive update.
    this.db.object('/favourites/1/10').set(null);
  }
}

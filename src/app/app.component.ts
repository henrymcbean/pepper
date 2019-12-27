import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pepper';
  cuisines$: AngularFireList<any[]>;
  restaurant$: AngularFireList<any[]>;
  cuisines: Observable<any[]>;
  restaurants: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines$ = this.db.list('/cuisines');
    this.restaurant$ = this.db.list('/restaurants');

    this.cuisines = this.cuisines$.valueChanges();
    this.restaurants = this.restaurant$.valueChanges()
      .pipe(map(restaurants => {
        console.log('BEFORE MAP', restaurants);
        restaurants.map(restaurant => {
          restaurant.cuisineType = this.db.object('/cuisines/' + restaurant.cuisine).valueChanges();
        });
        console.log('AFTER MAP', restaurants);
        return restaurants;
      }));
  }
}

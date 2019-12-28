import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pepper';
  features$: AngularFireList<any[]>;
  cuisines$: AngularFireList<any[]>;
  restaurant$: AngularFireList<any[]>;

  feature: Observable<any[]>;
  cuisines: Observable<any[]>;
  features: Observable<any[]>;
  restaurants: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines$ = this.db.list('/cuisines');
    this.features$ = this.db.list('/features');
    this.restaurant$ = this.db.list('/restaurants');

    this.cuisines = this.cuisines$.valueChanges();
    this.features = this.features$.valueChanges();

    this.restaurants = this.restaurant$.valueChanges()
      .pipe(map(restaurants => {
        restaurants.map(restaurant => {
          restaurant.featureTypes = [];
          // tslint:disable-next-line: forin
          for (let f in restaurant.features) {
            const featureName = '/features/' + f;
            this.feature = this.db.object(featureName).snapshotChanges()
              .subscribe(action => {
                console.log('Type', action.type);
                // console.log('Key', action.key);
                // console.log('Value', action.payload.val());
                restaurant.featureTypes.push({ key: action.key, value: action.payload.val() });
                console.log('restaurant', restaurant);
              });

            //console.log(this.feature);
            console.log(restaurant);
          }
        });
        return restaurants;
      }));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pepper';
  cuisines;
  private subscription;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.subscription = this.db.list('/cuisines').valueChanges().subscribe(x => {
      this.cuisines = x;
      console.log(this.cuisines);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

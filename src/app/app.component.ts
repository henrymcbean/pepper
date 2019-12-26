import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pepper';
  cuisines;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.cuisines = this.db.list('/cuisines').valueChanges();
  }
}

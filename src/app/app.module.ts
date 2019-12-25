import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAuVi56GiyT3GqILKobxTCdIWB-9EDqJ8w",
  authDomain: "pepper-a2bd9.firebaseapp.com",
  databaseURL: "https://pepper-a2bd9.firebaseio.com",
  projectId: "pepper-a2bd9",
  storageBucket: "pepper-a2bd9.appspot.com",
  messagingSenderId: "335620750957",
  appId: "1:335620750957:web:3e975e8aa9180944090964",
  measurementId: "G-3MQQVB5EST"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoEmptyWhitespaceDirective } from '@directives/no-empty-whitespace.directive';
import { ChatModule } from '@pages/chat/chat.module';

@NgModule({
  declarations: [AppComponent, NoEmptyWhitespaceDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ChatModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

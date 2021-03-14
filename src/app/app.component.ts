import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from './core/services/firebase.service';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('chatHistory') private chatHistory: ElementRef;

  public chatFormGroup: FormGroup = this.fb.group({
    message: new FormControl('', [Validators.required]),
  });

  recentMessages$: Observable<Message[]>;

  constructor(public readonly firebaseSvc: FirebaseService, private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.setUpRecentMessagesObs();
  }

  public sendMessage() {
    console.warn(this.chatFormGroup.value);

    this.firebaseSvc
      .saveMessage(this.chatFormGroup.get('message').value, 'bkw')
      .pipe(finalize(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)))
      .subscribe();

    this.chatFormGroup.reset();
  }

  public setUpRecentMessagesObs(): void {
    this.recentMessages$ = this.firebaseSvc.getRecentMessages();
  }
}

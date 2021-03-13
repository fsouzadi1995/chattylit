import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirebaseService } from './core/services/firebase.service';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public chatFormGroup: FormGroup = this.fb.group({
    message: new FormControl('', [Validators.required]),
  });

  messages$: Observable<Message>;

  constructor(public readonly firebaseSvc: FirebaseService, private readonly fb: FormBuilder) {}

  public ngOnInit(): void {}

  public sendMessage() {
    console.warn(this.chatFormGroup.value);

    this.firebaseSvc.saveMessage(this.chatFormGroup.get('message').value, 'bkw');

    this.chatFormGroup.reset();
  }
}

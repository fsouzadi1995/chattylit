import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FirebaseService } from './core/services/firebase.service';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(10px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate('250ms'), style({ opacity: 1 })])]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('chatHistory') private chatHistory: ElementRef;

  public messages: Message[];
  public recentMessages: Message[];

  public chatFormGroup: FormGroup = this.fb.group({
    message: new FormControl(null, [Validators.required]),
  });

  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    public readonly firebaseSvc: FirebaseService,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.messages = [];
    this.recentMessages = [];
  }

  public ngOnInit(): void {
    this.fetchRecentMessages();
    this.setUpMessagesObs();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public sendMessage() {
    const msg: string = this.chatFormGroup.get('message').value.trim();

    if (this.chatFormGroup.invalid) {
      return;
    }

    console.warn({ msg });

    this.firebaseSvc
      .postMessage(msg, 'bkw')
      .pipe(
        tap(() => this.cd.detectChanges()),
        tap(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)),
      )
      .subscribe();

    this.chatFormGroup.reset();
  }

  private setUpMessagesObs(): void {
    this.firebaseSvc.messages$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((res) => (this.messages = [...this.messages, ...res])),
        tap(() => this.cd.detectChanges()),
        tap(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)),
      )
      .subscribe();
  }

  private fetchRecentMessages(): void {
    this.firebaseSvc
      .getRecentMessages()
      .pipe(
        tap((messages) => (this.recentMessages = messages)),
        tap(() => this.cd.detectChanges()),
        tap(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)),
      )
      .subscribe();
  }
}

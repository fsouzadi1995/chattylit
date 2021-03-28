import { trigger, transition, style, animate } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { tap, finalize, take, takeUntil } from 'rxjs/operators';
import { MessageService } from '@core/services';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '@models/index';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('fadeSlideInLTR', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeSlideInRTL', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))])]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatHistory') private chatHistory: ElementRef;

  public userName: string;

  public messages: Message[];
  public recentMessages: Message[];

  public chatFormGroup: FormGroup = this.fb.group({
    message: new FormControl(null, [Validators.required]),
  });

  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private readonly spinnerSvc: NgxSpinnerService,
    public readonly messageSvc: MessageService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.spinnerSvc.show();
    this.fetchRecentMessages();
    this.setUpMessagesObs();

    this.cd.detectChanges();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public get isLoading(): boolean {
    return !!!this.messages && !!!this.recentMessages;
  }

  public get isEmpty(): boolean {
    return !this.isLoading && !!!this.messages?.length && !!!this.recentMessages?.length;
  }

  public openDropdown(): void {
    this.dialog
      .open(LoginComponent, {
        autoFocus: false,
        panelClass: 'dialog',
        height: '30%',
        width: '50%',
      })
      .afterClosed()
      .pipe(
        tap((name) => console.log({ name })),
        tap((name) => (this.userName = name)),
        finalize(() => this.cd.detectChanges()),
        take(1),
      )
      .subscribe();
  }

  public sendMessage(): void {
    const msg: string = this.chatFormGroup.get('message').value.trim();

    if (this.chatFormGroup.invalid) {
      return;
    }

    console.warn({ msg });

    this.messageSvc
      .postMessage(msg, this.userName)
      .pipe(
        tap(() => this.cd.detectChanges()),
        tap(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)),
      )
      .subscribe();

    this.chatFormGroup.reset();
  }

  private setUpMessagesObs(): void {
    this.messageSvc.messages$
      .pipe(
        tap((res) => (this.messages = [...(this.messages || []), ...res])),
        tap(() => this.cd.detectChanges()),
        tap(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)),
        takeUntil(this.onDestroy$),
      )
      .subscribe();
  }

  private fetchRecentMessages(): void {
    this.messageSvc
      .getRecentMessages()
      .pipe(
        tap((messages) => (this.recentMessages = messages)),
        tap(() => this.cd.detectChanges()),
        tap(() => this.chatHistory.nativeElement.scrollTo(0, this.chatHistory.nativeElement.scrollHeight)),
      )
      .subscribe();
  }
}

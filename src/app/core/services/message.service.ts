import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { switchMap, take } from 'rxjs/operators';
import { DateUtils } from 'src/app/utils/date-utils';
import { ApiService } from './api.service';
import { SearchOptions } from 'src/app/models/search-options.model';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public readonly messages$: Subject<Message[]> = new Subject();
  private readonly collectionName = 'messages';

  constructor(private readonly apiSvc: ApiService) {
    this.getRecentMessages();
    this.setUpMessageListener();
  }

  public postMessage(text: string, username: string): Observable<void> {
    return this.apiSvc.insertOne(this.collectionName, {
      text,
      username,
      read: false,
      date: new Date(),
    });
  }

  public getRecentMessages(): Observable<Message[]> {
    const searchParams: SearchOptions = {
      property: 'date',
      operator: '>',
      value: DateUtils.obtainFiveMinutesAgoDate(),
    };

    return from(
      this.apiSvc
        .getCollectionRef(this.collectionName)
        .where(searchParams.property, searchParams.operator, searchParams.value)
        .orderBy('date', 'asc')
        .get(),
    ).pipe(
      take(1),
      switchMap(({ docs }) =>
        of(
          docs.map((doc: DocumentData) => ({
            ...doc.data(),
            date: new Date(doc.data().date.seconds * 1000),
          })),
        ),
      ),
    );
  }

  private setUpMessageListener(): void {
    const searchParams: SearchOptions = {
      property: 'date',
      operator: '>',
      value: new Date(),
    };

    this.apiSvc
      .getCollectionRef(this.collectionName)
      .where(searchParams.property, searchParams.operator, searchParams.value)
      .orderBy('date', 'asc')
      .limitToLast(1)
      .onSnapshot((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          date: new Date(doc.data().date.seconds * 1000),
        })) as Message[];

        this.messages$.next(docs);
      });
  }
}

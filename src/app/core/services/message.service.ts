import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Message, SearchOptions } from '@models';
import { DateUtils } from '@utils/date-utils';
import { ApiService } from './api.service';

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

  public postMessage(text: string, username: string): Observable<any> {
    return this.apiSvc.insertOne<Message>(this.collectionName, {
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
      map(({ docs }) =>
        docs.map((doc: DocumentData) => ({
          ...doc.data(),
          date: new Date(doc.data().date.seconds * 1000),
        })),
      ),
      take(1),
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
      .onSnapshot(({ docs }) => {
        const messages = docs.map((doc) => ({
          ...doc.data(),
          date: new Date(doc.data().date.seconds * 1000),
        })) as Message[];

        this.messages$.next(messages);
      });
  }
}

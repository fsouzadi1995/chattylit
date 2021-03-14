import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { DateUtils } from 'src/app/utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public messages$: Observable<Message[]>;
  public historyMessages: Message[];
  private collection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.collection = afs.collection('messages');
    this.messages$ = this.collection.valueChanges().pipe(
      map((res) =>
        res
          .map(
            (msg: any) =>
              ({
                ...msg,
                date: new Date(msg.date.seconds * 1000),
              } as Message),
          )
          .sort((a, b) => a.date.valueOf() - b.date.valueOf()),
      ),
    );
  }

  getRecentMessages(): Observable<Message[]> {
    return from(this.collection.ref.where('date', '>', DateUtils.obtainFiveMinutesAgoDate()).get()).pipe(
      take(1),
      switchMap((res) =>
        of(
          res.docs
            .map((doc) => {
              const msg = doc.data();

              return {
                ...msg,
                date: new Date(msg.date.seconds * 1000),
              } as Message;
            })
            .sort((a, b) => a.date.valueOf() - b.date.valueOf()),
        ),
      ),
    );
  }

  saveMessage(text: string, username: string): Observable<any> {
    return from(
      this.collection.add({
        text,
        username,
        read: false,
        date: new Date(),
      }),
    ).pipe(take(1));
  }
}

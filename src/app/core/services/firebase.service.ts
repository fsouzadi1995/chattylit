import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of, Subject } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { DateUtils } from 'src/app/utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public messages$: Subject<Message[]> = new Subject();
  private readonly msgCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.msgCollection = this.afs.collection('messages');

    this.getRecentMessages();
    this.setUpMessageListener();
  }

  public postMessage(text: string, username: string): Observable<DocumentReference> {
    return from(
      this.msgCollection.add({
        text,
        username,
        read: false,
        date: new Date(),
      }),
    ).pipe(take(1));
  }

  public getRecentMessages(): Observable<Message[]> {
    return from(this.msgCollection.ref.where('date', '>', DateUtils.obtainFiveMinutesAgoDate()).get()).pipe(
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

  private setUpMessageListener(): void {
    this.msgCollection.ref
      .where('date', '>', new Date())
      .orderBy('date', 'asc')
      .limitToLast(1)
      .onSnapshot((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          const msg = doc.data();

          return {
            ...msg,
            date: new Date(msg.date.seconds * 1000),
          } as Message;
        });

        this.messages$.next(docs);
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public readonly messages$: Observable<Message[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.messages$ = afs
      .collection('messages')
      .valueChanges()
      .pipe(
        map((res) =>
          res.map((msg: any) => ({
            ...msg,
            date: new Date(msg.date.seconds * 1000),
          })),
        ),
        tap((res) => console.log(res)),
      );
  }

  saveMessage(text: string, username: string) {
    this.afs.collection('messages').add({
      text,
      username,
      read: false,
      date: new Date(),
    });
  }
}

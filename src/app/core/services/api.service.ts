import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { SearchOptions } from '@models';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly afs: AngularFirestore) {}

  public findOne<T>(collectionName: string, searchParams: SearchOptions): Observable<T> {
    return from(
      this.afs
        .collection<T>(collectionName)
        .ref.where(searchParams.property, searchParams.operator, searchParams.value)
        .get(),
    ).pipe(
      map(({ docs }) => {
        const [newDoc] = docs;

        return newDoc.data();
      }),
    );
  }

  public findMany<T>(collectionName: string, searchParams: SearchOptions): Observable<T[]> {
    return from(
      this.afs
        .collection<T>(collectionName)
        .ref.where(searchParams.property, searchParams.operator, searchParams.value)
        .get(),
    ).pipe(
      map((res) => res.docs),
      map((docs) => docs.map((doc) => doc.data())),
    );
  }

  public insertOne<T>(collectionName: string, doc?: any): Observable<T> {
    const { id } = this.afs.collection(collectionName).doc().ref;
    return from(
      this.afs
        .collection<T>(collectionName)
        .doc(id)
        .set({ ...doc, id }),
    ).pipe(
      switchMap(() => this.findOne<T>(collectionName, { property: 'id', operator: '==', value: id })),
    );
  }

  public updateOne<T>(collectionName: string, doc: any): Observable<T> {
    return from(this.afs.collection<T>(collectionName).doc(doc.id).set(doc)).pipe(
      switchMap(() => this.findOne<T>(collectionName, { property: 'id', operator: '==', value: doc.id })),
    );
  }

  public deleteOne<T>(collectionName: string, doc: any): Observable<void> {
    return from(this.afs.collection<T>(collectionName).doc(doc.id).delete());
  }

  public getCollectionRef(collectionName: string): CollectionReference {
    return this.afs.collection(collectionName).ref;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, QuerySnapshot } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { SearchOptions } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly afs: AngularFirestore) {}

  public findOne<T>(collectionName: string, searchParams: SearchOptions): Observable<QuerySnapshot<T>> {
    return from(
      this.afs
        .collection<T>(collectionName)
        .ref.where(searchParams.property, searchParams.operator, searchParams.value)
        .get(),
    );
  }

  public findMany<T>(collectionName: string, searchParams: SearchOptions): Observable<QuerySnapshot<T>> {
    return from(
      this.afs
        .collection<T>(collectionName)
        .ref.where(searchParams.property, searchParams.operator, searchParams.value)
        .get(),
    );
  }

  public insertOne<T>(collectionName: string, doc?: any): Observable<void> {
    const { id } = this.afs.collection(collectionName).doc().ref;
    return from(this.afs.collection<T>(collectionName).doc(id).set(doc));
  }

  public updateOne<T>(collectionName: string, doc: any): Observable<void> {
    return from(this.afs.collection<T>(collectionName).doc(doc.id).set(doc));
  }

  public deleteOne<T>(collectionName: string, doc: any): Observable<void> {
    return from(this.afs.collection<T>(collectionName).doc(doc.id).delete());
  }

  public getCollectionRef(collectionName: string): CollectionReference {
    return this.afs.collection(collectionName).ref;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { SearchOptions } from 'src/app/models/search-options.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly afs: AngularFirestore) {}

  public findOne(collectionName: string, searchParams: SearchOptions): Observable<QuerySnapshot<any>> {
    return from(
      this.afs
        .collection(collectionName)
        .ref.where(searchParams.property, searchParams.operator, searchParams.value)
        .get(),
    );
  }

  public findMany(collectionName: string, searchParams: SearchOptions): Observable<QuerySnapshot<any>> {
    return from(
      this.afs
        .collection(collectionName)
        .ref.where(searchParams.property, searchParams.operator, searchParams.value)
        .get(),
    );
  }

  public insertOne(collectionName: string, doc: any): Observable<any> {
    return from(this.afs.collection(collectionName).add(doc));
  }

  public updateOne(collectionName: string, doc: any): Observable<any> {
    return from(this.afs.collection(collectionName).doc(doc.id).set(doc));
  }

  public deleteOne(collectionName: string, doc: any): Observable<any> {
    return from(this.afs.collection(collectionName).doc(doc.id).delete());
  }
}

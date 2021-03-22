import firebase from 'firebase/app';

export class SearchOptions {
  property: string | firebase.firestore.FieldPath;
  operator: firebase.firestore.WhereFilterOp;
  value: any;
}

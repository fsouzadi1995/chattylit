import firebase from 'firebase/app';

export interface SearchOptions {
  property: string | firebase.firestore.FieldPath;
  operator: firebase.firestore.WhereFilterOp;
  value: any;
}

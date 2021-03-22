import firebase from 'firebase/app';

export class SearchOptions {
  property: firebase.firestore.FieldPath;
  operator: firebase.firestore.WhereFilterOp;
  value: any;
}

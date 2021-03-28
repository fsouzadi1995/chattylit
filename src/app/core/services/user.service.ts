import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@models/index';
import { ApiService } from './api.service';
import { QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userCollection = 'users';

  constructor(private readonly apiSvc: ApiService) {}

  public getUser(id: string): Observable<QuerySnapshot<User>> {
    return this.apiSvc.findOne<User>(this.userCollection, { property: 'id', operator: '==', value: id });
  }

  public createUser(user: User): Observable<void> {
    return this.apiSvc.insertOne(this.userCollection, user);
  }

  public updateUser(user: User): Observable<void> {
    return this.apiSvc.updateOne(this.userCollection, user);
  }

  public deleteUser(id: string): Observable<void> {
    return this.apiSvc.deleteOne(this.userCollection, id);
  }
}

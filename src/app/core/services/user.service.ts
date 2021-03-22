import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userCollection = 'users';

  constructor(private readonly apiSvc: ApiService) {}

  public getUser(id: string): Observable<User> {
    return this.apiSvc.findOne(this.userCollection, id, { property: 'id', operator: '==', value: id });
  }

  public createUser(user: User): Observable<any> {
    return this.apiSvc.insertOne(this.userCollection, user);
  }

  public updateUser(user: User): Observable<any> {
    return this.apiSvc.updateOne(this.userCollection, user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.apiSvc.deleteOne(this.userCollection, id);
  }
}

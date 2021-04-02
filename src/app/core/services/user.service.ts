import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '@models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly concurrentUsers$: Subject<User[]> = new Subject();

  private readonly userCollection = 'users';
  private readonly concurrentUserCollection = 'concurrentUsers';

  constructor(private readonly apiSvc: ApiService) {
    this.setUpConcurrentUsersListener();
  }

  public getUser(id: string): Observable<User> {
    return this.apiSvc.findOne<User>(this.userCollection, { property: 'id', operator: '==', value: id });
  }

  public createUser(name: string): Observable<User> {
    const user: User = {
      name,
      createDate: new Date(),
    };

    return this.apiSvc.insertOne<User>(this.userCollection, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.apiSvc.updateOne<User>(this.userCollection, user);
  }

  public deleteUser(user: User): Observable<void> {
    return this.apiSvc.deleteOne<User>(this.userCollection, user);
  }

  // Concurrent users

  public createConcurrentUser(name: string): Observable<User> {
    const user: User = {
      name,
      createDate: new Date(),
    };

    return this.apiSvc.insertOne<User>(this.concurrentUserCollection, user);
  }

  public deleteConcurrentUser(user: User): Observable<void> {
    return this.apiSvc.deleteOne<User>(this.concurrentUserCollection, user);
  }

  public setUpConcurrentUsersListener(): void {
    this.apiSvc.getCollectionRef(this.concurrentUserCollection).onSnapshot(({ docs }) => {
      const users = docs.map((user) => user.data() as User);

      this.concurrentUsers$.next(users);
    });
  }
}

import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { User } from '../domain/model/user.entity';
import { UsersApiEndpoint } from './users-api-endpoint';


@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly usersEndpoint: UsersApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoint(http);
  }

  getUsers(): Observable<User[]> {
    return this.usersEndpoint.getAll();
  }

  getUser(id: number): Observable<User> {
    return this.usersEndpoint.getById(id);
  }

  createUser(user: User): Observable<User> {
    return this.usersEndpoint.create(user);
  }

  updateUser(user: User): Observable<User> {
    return this.usersEndpoint.update(user, user.id);
  }

  deleteUser(id: number): Observable<void> {
    return this.usersEndpoint.delete(id);
  }
}

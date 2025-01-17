import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient;
  private api_url: string = environment.api_url;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.api_url}/usuarios`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.api_url}/usuarios/${id}`);
  }

  createUser(data: User) {
    return this.http.post<User>(`${this.api_url}/usuarios`, data);
  }

  updateUser(id: number, data: User) {
    return this.http.put<User>(`${this.api_url}/usuarios/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.api_url}/usuarios/${id}`);
  }
}

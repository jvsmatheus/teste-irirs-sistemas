import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

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
    return this.http.get(`${this.api_url}/usuarios`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.api_url}/usuarios/${id}`);
  }

  createUser(data: any) {
    return this.http.post(`${this.api_url}/usuarios`, data);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.api_url}/usuarios/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api_url}/usuarios/${id}`);
  }
}

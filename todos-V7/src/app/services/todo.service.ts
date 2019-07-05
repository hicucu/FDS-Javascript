import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { iTodo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  appUrl = environment.appUrl;
  isLoading = false;

  constructor(private http: HttpClient) { }

  add(todo: iTodo) {
    return this.http.post<iTodo[]>(this.appUrl, todo);
  }

  getAll() {
    return this.http.get<iTodo[]>(this.appUrl);
  }

  toggle(todo: iTodo) {
    return this.http.patch<iTodo[]>(
      `${this.appUrl}/${todo.id}`,
      { "completed": !todo.completed }
    );
  }

  toggleAll(completed: boolean) {
    return this.http.patch<iTodo[]>(this.appUrl, { completed });
  }

  remove(id: number) {
    return this.http.delete<iTodo[]>(`${this.appUrl}/${id}`);
  }
  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}

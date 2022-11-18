import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _HttpClient: HttpClient) {}

  // Get All Items
  getAll(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}notes`);
  }

  //Get Item
  getItem(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}notes/${id}`);
  }

  // Delete Post
  deleteNote(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.apiUrl}notes/${id}`);
  }

  // Add Post
  add(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}notes`, data);
  }

  // Update Post
  update(id: number, data: object): Observable<any> {
    return this._HttpClient.put(`${environment.apiUrl}notes/${id}`, data);
  }
}

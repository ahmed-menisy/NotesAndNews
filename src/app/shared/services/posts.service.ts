import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private _HttpClient: HttpClient) {}

  subjectName: Subject<any> = new Subject();

  // Get All Items
  getAll(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}posts`);
  }

  //Get Item
  getItem(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}posts/${id}`);
  }

  // Delete Post
  deletePost(id: any): Observable<any> {
    return this._HttpClient.delete(`${environment.apiUrl}posts/${id}`);
  }

  // Add Post
  add(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}posts`, data);
  }

  // Update Post
  update(id: number, data: object): Observable<any> {
    return this._HttpClient.put(`${environment.apiUrl}posts/${id}`, data);
  }

  //Get News by Api News
  getNews(): Observable<any> {
    return this._HttpClient.get(`${environment.apiNews}`);
  }
}

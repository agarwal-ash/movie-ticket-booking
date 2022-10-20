import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url ="https://633eb81a83f50e9ba3b6ac72.mockapi.io/films"
  constructor(private http: HttpClient) { }
  getPosts() {
    return this.http.get(this.url);
    console.log(this.http.get(this.url));
  }
  getPostDetails(id:number)
  {
    return this.http.get(this.url+'/'+id);
  }
}

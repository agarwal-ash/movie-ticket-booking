import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  private url ="https://633eb81a83f50e9ba3b6ac72.mockapi.io/users";

  constructor(private http: HttpClient) { }

  getusersData()
  {
    return this.http.get(this.url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private http: HttpClient) { }

  postUserData(userData:any)
  {
    this.http.post('https://633eb81a83f50e9ba3b6ac72.mockapi.io/users', userData).subscribe(

      data => console.log('post success', data),

      error => console.log('post oops', error)

    );
  }
}

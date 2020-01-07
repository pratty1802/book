import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Books } from './books';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }

//api call to get books using http get method
  getBooks(bookUrl): Observable<any>{
    return this.http.get<Books>(bookUrl);
  }

  

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http:HttpClient) { }
  getData(subject: string)
  {
    let url=`https://openlibrary.org/search.json?title=${subject.replaceAll(" ", "+")}`;
    return this.http.get(url);
  }

  search(query: any) {
    let url = `https://openlibrary.org/search.json?title=${query.replaceAll(" ", "+")}`
    return this.http.get(url)
  }
}

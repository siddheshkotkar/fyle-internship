import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempService {
  private subjectName = new Subject<string>();
  getSubject() : Observable<string> {
    return this.subjectName.asObservable()
  }
  setSubject(val: string) {
    this.subjectName.next(val);
  }
}

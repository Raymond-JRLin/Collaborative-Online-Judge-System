import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InputService {

  private inputSubject$ = new BehaviorSubject<string>(''); // default ''

  constructor() { }

  changeInput(term) {
    this.inputSubject$.next(term);
  }

  getInput(): Observable<string> {
    return this.inputSubject$.asObservable(); // return as Observable rather than reference
  }

}

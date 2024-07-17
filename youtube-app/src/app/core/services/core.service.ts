import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  sortByDate: boolean = false;
  sortByCountView: boolean = false;
  filterTerm: string = '';

  constructor() {}

  set searchTerm(value: string) {
    this.searchTermSubject.next(value);
  }

  get searchTerm(): string {
    return this.searchTermSubject.value;
  }
}

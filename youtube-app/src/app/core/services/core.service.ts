import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  // for login //
  private isLoginSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  // for search //

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private filterTermSubject = new BehaviorSubject<string>('');
  filterTerm$ = this.filterTermSubject.asObservable();

  private sortByDateSubject = new BehaviorSubject<boolean>(false);
  sortByDate$ = this.sortByDateSubject.asObservable();

  private sortByCountViewSubject = new BehaviorSubject<boolean>(false);
  sortByCountView$ = this.sortByCountViewSubject.asObservable();

  constructor() {}

  set userName(value: string) {
    this.userNameSubject.next(value);
  }
  get userName(): string {
    return this.userNameSubject.value;
  }

  set isLogin(value: boolean) {
    this.isLoginSubject.next(value);
  }
  get isLogin(): boolean {
    return this.isLoginSubject.value;
  }

  set searchTerm(value: string) {
    this.searchTermSubject.next(value);
  }
  get searchTerm(): string {
    return this.searchTermSubject.value;
  }

  set filterTerm(value: string) {
    this.filterTermSubject.next(value);
  }
  get filterTerm(): string {
    return this.filterTermSubject.value;
  }

  set sortByDate(value: boolean) {
    this.sortByDateSubject.next(value);
  }
  get sortByDate(): boolean {
    return this.sortByDateSubject.value;
  }

  set sortByCountView(value: boolean) {
    this.sortByCountViewSubject.next(value);
  }
  get sortByCountView(): boolean {
    return this.sortByCountViewSubject.value;
  }
}

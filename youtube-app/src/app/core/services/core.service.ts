import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  searchTerm: string = '';
  sortByDate: boolean = false;
  sortByCountView: boolean = false;
  filterTerm: string = '';

  constructor() {}
}

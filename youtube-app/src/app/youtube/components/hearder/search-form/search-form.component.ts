import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortService } from '../../../../core/services/sort.service';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  private subscription!: Subscription;

  searchQuery: string = ''; // свойство для хранения запроса
  private searchQuerySubject = new BehaviorSubject<string>(''); // BehaviorSubject для управления запросом

  private destroyRef = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private sortService: SortService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [''],
    });

    // подписка на изменения в запросе
    this.subscription = this.searchQuerySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((query) => query.length > 2),
        switchMap((query) => {
          return this.search(query);
        }), // выполнение поиска
        takeUntil(this.destroyRef) // отписка при уничтожении компонента
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyRef.next();
    this.destroyRef.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private search(query: string): Observable<never> {
    this.sortService.searchTerm = query;
    this.router.navigate(['/']);
    return of(); // возвращаем Observable, чтобы использовать switchMap
  }

  onQueryChange() {
    const query = this.searchForm.get('query')!.value;
    this.searchQuerySubject.next(query);
  }

  onSubmitResults() {
    const query = this.searchForm.get('query')!.value;
    if (query.length > 2) {
      this.searchQuerySubject.next(query);
    }
  }
}

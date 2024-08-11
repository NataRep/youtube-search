import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SortService } from '../../../core/services/sort.service';
import { of, Subscription } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { initialState } from '../../../redux/reducers';
import * as AppAction from './../../../redux/actions';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let store: MockStore;
  let sortService: SortService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: SortService, useValue: { searchTerm$: of('test') } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    sortService = TestBed.inject(SortService);
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to search term and search for videos', () => {
    const searchVideoSpy = jest.spyOn(component, 'searchVideo');
    sortService.searchTerm$ = of('test');
    component.ngOnInit();
    expect(searchVideoSpy).toHaveBeenCalledWith('test');
  });

  it('should handle empty search term', () => {
    sortService.searchTerm$ = of('');
    component.ngOnInit();
    expect(component.isEmptySearch).toBe(true);
  });

  it('should dispatch action to search for videos', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.searchVideo('test');
    expect(dispatchSpy).toHaveBeenCalledWith(
      AppAction.getVideos({ query: 'test' })
    );
  });

  it('should unsubscribe from search term on destroy', () => {
    const subscription = component['subscriptionSearchTerm'] as Subscription;
    const unsubscribeSpy = jest.spyOn(subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortingComponent } from './search-sorting.component';

describe('SearchSortingComponent', () => {
  let component: SearchSortingComponent;
  let fixture: ComponentFixture<SearchSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSortingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

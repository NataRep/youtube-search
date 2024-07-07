import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortButtonComponent } from './search-sort-button.component';

describe('SearchSortButtonComponent', () => {
  let component: SearchSortButtonComponent;
  let fixture: ComponentFixture<SearchSortButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSortButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSortButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

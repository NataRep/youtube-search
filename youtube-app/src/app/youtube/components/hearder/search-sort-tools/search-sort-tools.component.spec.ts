import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortToolsComponent } from './search-sort-tools.component';

describe('SearchSortToolsComponent', () => {
  let component: SearchSortToolsComponent;
  let fixture: ComponentFixture<SearchSortToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSortToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSortToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

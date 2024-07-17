import { Pipe, PipeTransform } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { Item } from '../models/search-item.model';

@Pipe({
  name: 'sortVideo',
  pure: false,
})
export class SortVideoPipe implements PipeTransform {
  constructor(private coreService: CoreService) {}

  transform(items: Item[]): Item[] {
    let sortedItems = [...items];

    if (this.coreService.sortByDate) {
      sortedItems = sortedItems.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );
    } else if (this.coreService.sortByCountView) {
      sortedItems = sortedItems.sort(
        (a, b) =>
          Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
      );
    }

    if (this.coreService.filterTerm) {
      sortedItems = sortedItems.filter((item) =>
        item.snippet.title
          .toLowerCase()
          .includes(this.coreService.filterTerm.toLowerCase())
      );
    }

    return sortedItems;
  }
}

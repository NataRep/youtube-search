import { Pipe, PipeTransform } from '@angular/core';
import { SortService } from '../../core/services/sort.service';
import { Item } from '../../core/models/search-item.model';

@Pipe({
  name: 'sortVideo',
  pure: false,
})
export class SortVideoPipe implements PipeTransform {
  constructor(private sortService: SortService) {}

  transform(items: Item[]): Item[] {
    let sortedItems = [...items];

    if (this.sortService.sortByDate) {
      if (this.sortService.forwardDirection) {
        sortedItems = sortedItems.sort(
          (a, b) =>
            new Date(a.snippet.publishedAt).getTime() -
            new Date(b.snippet.publishedAt).getTime()
        );
      } else {
        sortedItems = sortedItems.sort(
          (a, b) =>
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
        );
      }
    } else if (this.sortService.sortByCountView) {
      if (this.sortService.forwardDirection) {
        sortedItems = sortedItems.sort(
          (a, b) =>
            Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
        );
      } else {
        sortedItems = sortedItems.sort(
          (a, b) =>
            Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
        );
      }
    }

    if (this.sortService.filterTerm) {
      sortedItems = sortedItems.filter((item) =>
        item.snippet.title
          .toLowerCase()
          .includes(this.sortService.filterTerm.toLowerCase())
      );
    }

    return sortedItems;
  }
}

import { Item } from './search-item.model';

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { environment } from '../../../environments/environment';
import { Item } from '../models/search-item.model';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Проверяет, что не осталось никаких незавершенных запросов
  });

  describe('getFoundedVideos', () => {
    it('should return videos for a valid query', () => {
      const mockResponse = {
        items: [{ id: '1AAA222334' }, { id: '2BBBFDSJJ88' }] as Item[],
      };

      service.getFoundedVideos('test').subscribe((items) => {
        expect(items.length).toBe(2);
        expect(items[0].id).toBe('1AAA222334');
        expect(items[1].id).toBe('2BBBFDSJJ88');
      });

      const req = httpMock.expectOne((request) => {
        return (
          request.url === '/search' &&
          request.params.get('key') === environment.apiKey &&
          request.params.get('q') === 'test' &&
          request.params.get('part') === 'snippet'
        );
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return an empty array for an empty query', () => {
      service.getFoundedVideos('').subscribe((items) => {
        expect(items.length).toBe(0);
      });

      httpMock.expectNone('/search');
    });
  });

  describe('getVideosStatistics', () => {
    it('should return statistics for given video IDs', () => {
      const mockResponse = {
        items: [
          { id: '1AAA222334', statistics: { viewCount: '1000' } },
          { id: '2BBBFDSJJ88', statistics: { viewCount: '2000' } },
        ],
      };

      const videoIds = ['1AAA222334', '2BBBFDSJJ88'];

      service.getVideosStatistics(videoIds).subscribe((stats) => {
        expect(stats.length).toBe(2);
        expect(stats[0].id).toBe('1AAA222334');
        expect(stats[0].statistics.viewCount).toBe('1000');
        expect(stats[1].id).toBe('2BBBFDSJJ88');
        expect(stats[1].statistics.viewCount).toBe('2000');
      });

      const req = httpMock.expectOne((request) => {
        return (
          request.url === '/videos' &&
          request.params.get('key') === environment.apiKey &&
          request.params.get('id') === '1AAA222334,2BBBFDSJJ88' &&
          request.params.get('part') === 'statistics'
        );
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should throw an error if no statistics are found', () => {
      const videoIds = ['1AAA222334'];

      service.getVideosStatistics(videoIds).subscribe({
        next: () => fail('Expected an error, but got a success response'),
        error: (error) => {
          expect(error.message).toBe('No statistics found');
        },
      });

      const req = httpMock.expectOne((request) => {
        return (
          request.url === '/videos' &&
          request.params.get('key') === environment.apiKey &&
          request.params.get('id') === '1AAA222334' &&
          request.params.get('part') === 'statistics'
        );
      });

      expect(req.request.method).toBe('GET');
      req.flush({ items: [] }); // Возвращаем пустой массив, что имитирует отсутствие статистики
    });

    it('should set correct parameters in the request', () => {
      const videoIds = ['1AAA222334', '2DFGDDDBB1B', '3BBBAA4567F'];

      service.getVideosStatistics(videoIds).subscribe();

      const req = httpMock.expectOne((request) => {
        const params = request.params;
        return (
          request.url === '/videos' &&
          params.get('key') === environment.apiKey &&
          params.get('id') === '1AAA222334,2DFGDDDBB1B,3BBBAA4567F' &&
          params.get('part') === 'statistics'
        );
      });

      expect(req.request.method).toBe('GET');
      req.flush({ items: [] }); // Возвращаем пустой массив, чтобы завершить запрос
    });
  });
});

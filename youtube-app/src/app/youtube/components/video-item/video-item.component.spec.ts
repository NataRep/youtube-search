import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { VideoItemComponent } from './video-item.component';
import { Item, Statistics } from '../../../core/models/search-item.model';

// Создайте заглушку для пайпа trimVideoName
@Pipe({ name: 'trimVideoName' })
class MockTrimVideoNamePipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 40 ? `${value.slice(0, 36)}...` : value;
  }
}

describe('VideoItemComponent', () => {
  let component: VideoItemComponent;
  let fixture: ComponentFixture<VideoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoItemComponent, MockTrimVideoNamePipe], // Подключите MockPipe
    }).compileComponents();

    fixture = TestBed.createComponent(VideoItemComponent);
    component = fixture.componentInstance;

    // входные параметры для компонента
    component.item = {
      id: '1Dlf2LGL3',
      snippet: {
        publishedAt: '2021-08-01T00:00:00Z',
        title: 'A very long video title that should be trimmed by the pipe',
        description: 'Test video description',
        thumbnails: { medium: { url: 'test-url', width: 120, height: 90 } },
        tags: ['test'],
      },
      statistics: {
        viewCount: '1000',
        likeCount: '100',
        favoriteCount: '10',
        commentCount: '5',
      } as Statistics,
    } as Item;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.statistics).toEqual(component.item.statistics);
    expect(component.id).toBe('1Dlf2LGL3');
  });

  it('should get item published date', () => {
    expect(component.getItemPublishedDate()).toBe('2021-08-01T00:00:00Z');
  });

  it('should apply trimVideoName pipe to the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Проверяем что название было обрезано
    const titleElement = compiled.querySelector('.item-title');
    expect(titleElement?.textContent).toBe(
      ' A very long video title that should ... '
    );
  });
});

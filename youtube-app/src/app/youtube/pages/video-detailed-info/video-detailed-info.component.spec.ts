import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailedInfoComponent } from './video-detailed-info.component';

describe('VideoDetailedInfoComponent', () => {
  let component: VideoDetailedInfoComponent;
  let fixture: ComponentFixture<VideoDetailedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoDetailedInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

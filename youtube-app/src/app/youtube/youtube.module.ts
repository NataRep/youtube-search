import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { AppCustomClassDirective } from './directives/app-custom-class.directive';
import { TrimVideoNamePipe } from './pipes/trim-video-name.pipe';
import { SortVideoPipe } from './pipes/sort-video.pipe';
import { MainComponent } from './pages/main/main.component';
import { YouTubeRoutingModule } from './youtube-routing.module';
import { VideoDetailedInfoComponent } from './pages/video-detailed-info/video-detailed-info.component';

@NgModule({
  declarations: [
    SocialInfoComponent,
    SearchResultsComponent,
    VideoItemComponent,
    AppCustomClassDirective,
    TrimVideoNamePipe,
    SortVideoPipe,
    MainComponent,
    VideoDetailedInfoComponent,
  ],
  imports: [CommonModule, MatIconModule, SharedModule, YouTubeRoutingModule],
  exports: [SearchResultsComponent],
})
export class YoutubeModule {}

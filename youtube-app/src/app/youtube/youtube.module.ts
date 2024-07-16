import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { VideoItemComponent } from './components/video-item/video-item.component';

import { AppCustomClassDirective } from './directives/app-custom-class.directive';

@NgModule({
  declarations: [
    SocialInfoComponent,
    SearchResultsComponent,
    VideoItemComponent,
    AppCustomClassDirective,
  ],
  imports: [CommonModule, MatIconModule, SharedModule],
  exports: [SearchResultsComponent],
})
export class YoutubeModule {}

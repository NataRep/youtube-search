import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { VideoStateDirective } from './directives/video-state.directive';

@NgModule({
  declarations: [VideoItemComponent, SocialInfoComponent, VideoStateDirective],
  imports: [CommonModule, MatIconModule, SharedModule],
})
export class YoutubeModule {}

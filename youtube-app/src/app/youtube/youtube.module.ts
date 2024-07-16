import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [VideoItemComponent, SocialInfoComponent],
  imports: [CommonModule, MatIconModule],
})
export class YoutubeModule {}

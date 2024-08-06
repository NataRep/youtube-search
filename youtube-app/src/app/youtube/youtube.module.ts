import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialInfoComponent } from './components/social-info/social-info.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { AppCustomClassDirective } from './directives/app-custom-class.directive';
import { TrimVideoNamePipe } from './pipes/trim-video-name.pipe';
import { SortVideoPipe } from './pipes/sort-video.pipe';
import { MainComponent } from './pages/main/main.component';
import { VideoDetailedInfoComponent } from './pages/video-detailed-info/video-detailed-info.component';
import { HeaderComponent } from './components/hearder/header.component';
import { LogoComponent } from './components/hearder/logo/logo.component';
import { SearchFormComponent } from './components/hearder/search-form/search-form.component';
import { SearchSortButtonComponent } from './components/hearder/search-sort-button/search-sort-button.component';
import { SearchSortToolsComponent } from './components/hearder/search-sort-tools/search-sort-tools.component';
import { LoginButtonComponent } from './components/hearder/login-button/login-button.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { YouTubeRoutingModule } from './youtube-routing.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CardCreationFormComponent } from './components/card-creation-form/card-creation-form.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

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
    HeaderComponent,
    LogoComponent,
    SearchFormComponent,
    SearchSortButtonComponent,
    SearchSortToolsComponent,
    LoginButtonComponent,
    SafeUrlPipe,
    CardCreationFormComponent,
    AdminComponent,
    FavoriteIconComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    YouTubeRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [SearchResultsComponent, HeaderComponent],
})
export class YoutubeModule {}

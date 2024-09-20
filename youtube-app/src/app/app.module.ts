import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeModule } from './youtube/youtube.module';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { shorteningInterceptor } from './core/interceptors/shortening.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './redux/reducers';
import { EffectsVideos } from './redux/effects';
import { FooterComponent } from './youtube/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YoutubeModule,
    StoreModule.forRoot({ appState: reducers }),
    EffectsModule.forRoot([EffectsVideos]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([shorteningInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

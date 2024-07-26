import { NgModule } from '@angular/core';
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
import { authInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, YoutubeModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([shorteningInterceptor, authInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

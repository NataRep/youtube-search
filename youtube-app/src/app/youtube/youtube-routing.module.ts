import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { VideoDetailedInfoComponent } from './pages/video-detailed-info/video-detailed-info.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Youtube app',
  },
  {
    path: 'details/:id',
    component: VideoDetailedInfoComponent,
    title: 'Video detailed info',
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Not found',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Page for admin',
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Favorites',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YouTubeRoutingModule {}

import {NgModule} from '@angular/core';
import {Routes , RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { HomeComponent } from './home/home.component';
import { SearchListComponent } from './search-list/search-list.component';
const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'watch',
    component: VideoPlayerComponent
  },
  {
    path:'result',
    component: SearchListComponent 
  }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule{}

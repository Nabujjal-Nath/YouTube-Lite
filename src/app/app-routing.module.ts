import {NgModule} from '@angular/core';
import {Routes , RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { WatchPageComponent } from './watch-page/watch-page.component';
const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'watch',
    component: WatchPageComponent
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

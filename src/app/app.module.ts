import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoCardComponent } from './video-card/video-card.component';
import {AppRoutingModule} from './app-routing.module';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { HomeComponent } from './home/home.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { SearchListComponent } from './search-list/search-list.component';
import { WatchPageComponent } from './watch-page/watch-page.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsContainerComponent } from './comments-container/comments-container.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { KeywordFilterComponent } from './keyword-filter/keyword-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    VideoContainerComponent,
    VideoCardComponent,
    VideoPlayerComponent,
    HomeComponent,
    SearchbarComponent,
    SearchListComponent,
    WatchPageComponent,
    CommentComponent,
    CommentsContainerComponent,
    LiveChatComponent,
    ChatMessageComponent,
    KeywordFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

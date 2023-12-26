import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, throwError } from 'rxjs';
import { CommentReplies, Comment } from '../model';
import { formatCount } from 'src/utils/common-utils';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.scss']
})
export class CommentsContainerComponent implements OnInit {
  @Input()
  commentCount!: string | undefined;
  @Input()
  videoId!: string;
  comments: Comment[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // Check if videoId has changed
    if (changes['videoId'] && changes['videoId'].currentValue) {
      this.fetchCommentThreads(this.videoId);
    }
  }

  fetchCommentThreads(videoId: string) {
    console.log("VID::", videoId)
    this.apiService.fetchCommentListAPI(videoId).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    ).subscribe((list) => {
      console.log("comments list:", list);
      this.comments = this.transformResponseToComments(list);
      console.log("comments after transform:", this.comments);
    })
  }

  transformResponseToComments(list: any): Comment[] {
    return list.items.map((item: any) => this.transformSnippetToComment(item, true));
  }

  transformSnippetToComment(item: any, isTopLevel: boolean): Comment {
    const snippet = isTopLevel ? item.snippet.topLevelComment.snippet : item.snippet;
    return {
      commentId: isTopLevel ? item.id : snippet.channelId,
      totalReplyCount: isTopLevel ? item.snippet.totalReplyCount : undefined,
      likeCount: formatCount(snippet.likeCount),
      textOriginal: snippet.textOriginal,
      replies: isTopLevel ? this.transformReplies(item.replies) : undefined,
      authorDisplayName: snippet.authorDisplayName,
      authorProfileImageUrl: snippet.authorProfileImageUrl,
      authorChannelUrl: snippet.authorChannelUrl,
      authorChannelId: snippet.authorChannelId.value,
      publishedAt: snippet.publishedAt
    };
  }

  transformReplies(replies: any): CommentReplies | undefined {
    if (replies && replies.comments) {
      return {
        comments: replies.comments.map((reply: any) => this.transformSnippetToComment(reply, false))
      }
    }
    return undefined;
  }
}

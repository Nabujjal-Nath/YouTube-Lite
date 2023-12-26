import { Component, Input } from '@angular/core';
import { Comment } from '../model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input()
  comments: Comment[] = [];

  toggleRepliesVisibility(comment: Comment) {
    comment.showReplies = !comment.showReplies;
  }

}

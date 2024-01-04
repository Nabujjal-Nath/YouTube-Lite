export interface videoDetailsInterface {
    videoId: string,
    channelIcon: string
    thumbnails: string,
    title: string,
    channelTitle: string,
    viewCount: string,
    channelId?: string,
    videoDescription?: string,
    channelDescription?: string,
    likeCount?: string,
    subscribers?: string,
    commentCount?: string | undefined
}

export interface Comment {
    textOriginal: string,
    authorDisplayName: string,
    authorProfileImageUrl: string,
    authorChannelUrl: string,
    publishedAt: string
    likeCount: string,
    authorChannelId?: string,
    commentId?: string;
    replies?: CommentReplies,
    totalReplyCount?: number,
    showReplies?: boolean;
}
export interface CommentReplies {
    comments: Comment[];
}

export interface ChatMessage {
    name: string;
    message: string;
  }
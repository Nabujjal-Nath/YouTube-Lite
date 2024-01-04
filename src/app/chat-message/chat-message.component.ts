import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatMessage } from '../model';
import { ChatService } from '../live-chat/live-chat.service';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent{
@Input()
chat:any

}

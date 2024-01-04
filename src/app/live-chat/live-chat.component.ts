import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatMessage } from '../model';
import { ChatService } from '../live-chat/live-chat.service';
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss']
})
export class LiveChatComponent implements OnInit, OnDestroy {
  chatMessages: ChatMessage[] = [];
  liveMessage = '';
  constructor(private chatService: ChatService) { }
  ngOnInit() {
    this.chatService.startGeneratingMessages();
    this.chatService.getMessages().subscribe(messages => {
      this.chatMessages = messages;
    });
  }

  sendMessage() {
    if (this.liveMessage.trim()) {
      this.chatService.addMessage({ name: 'New User', message: this.liveMessage });
      this.liveMessage = '';
    }
  }
  ngOnDestroy(): void { }

}

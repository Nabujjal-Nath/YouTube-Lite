import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { generateRandomMessage, generateRandomName } from '../../utils/common-utils';
import { ChatMessage } from '../model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  private maxMessages = 238;

  getMessages(): Observable<ChatMessage[]> {
    return this.messages.asObservable();
  }

  addMessage(message: ChatMessage): void {
    const currentMessages = this.messages.value;
    const newMessages = [...currentMessages, message];
    if (newMessages.length > this.maxMessages) {
      newMessages.shift(); // Remove the oldest message
    }
    this.messages.next(newMessages);
  }

  startGeneratingMessages(): void {
    setInterval(() => {
      this.addMessage({
        name: generateRandomName(),
        message: generateRandomMessage(8)
      });
    }, 1500);
  }
}
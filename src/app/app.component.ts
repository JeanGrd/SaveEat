import { Component } from '@angular/core';
import { MessageService, MessageData } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messageData: MessageData | null = null;

  constructor(public messageService: MessageService) {
    this.messageService.message$.subscribe((messageData) => {
      this.messageData = messageData;
    });
  }
}

import { Component } from '@angular/core';
import { MessageService, MessageData } from './message.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messageData: MessageData | null = null;

  constructor(public messageService: MessageService, private authService: AuthService) {
    this.messageService.message$.subscribe((messageData) => {
      this.messageData = messageData;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

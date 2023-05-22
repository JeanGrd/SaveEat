import { Component } from '@angular/core';
import { MessageService, MessageData } from './message.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messageData: MessageData | null = null; // Données du message initialisées à null

  constructor(public messageService: MessageService, private authService: AuthService) {
    // Souscription au service de messages pour mettre à jour messageData lorsqu'un nouveau message est reçu
    this.messageService.message$.subscribe((messageData) => {
      this.messageData = messageData;
    });
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

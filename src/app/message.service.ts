import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Interface pour les données du message
export interface MessageData {
  message: string; // Contenu du message
  messageType: 'success' | 'error'; // Type de message ('success' ou 'error')
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _message$ = new BehaviorSubject<MessageData | null>(null); // Sujet comportant les données du message
  message$ = this._message$.asObservable(); // Observable pour écouter les données du message

  // Affiche un message avec un contenu et un type spécifiés
  showMessage(message: string, messageType: 'success' | 'error' = 'success') {
    this._message$.next({ message, messageType }); // Émet les données du message
    setTimeout(() => this._message$.next(null), 3000); // Efface le message après 3 secondes
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MessageData {
  message: string;
  messageType: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _message$ = new BehaviorSubject<MessageData | null>(null);
  message$ = this._message$.asObservable();

  showMessage(message: string, messageType: 'success' | 'error' = 'success') {
    this._message$.next({ message, messageType });
    setTimeout(() => this._message$.next(null), 3000);
  }
}

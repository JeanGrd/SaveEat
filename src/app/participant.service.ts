import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiUrl = 'http://localhost:3001/events';

  constructor(private http: HttpClient) {}

  getAll(eventId: number, page: number): Observable<{ participants: any[], total: number }> {
    return this.http.get<{ participants: any[], total: number }>(`${this.apiUrl}/${eventId}/participants?page=${page}`);
  }

  getParticipants(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants`;
    return this.http.get(url);
  }

  getParticipant(eventId: number, participantId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}`;
    return this.http.get(url);
  }

  deleteParticipant(eventId: number, participantId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}`;
    return this.http.delete(url);
  }

  updateParticipant(eventId: number, participantId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}/`;
    return this.http.put(url, eventData);
  }

  createParticipant(eventId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants`;
    return this.http.post(url, eventData);
  }

}


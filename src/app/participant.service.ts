import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiUrl = 'http://localhost:3001/events';

  constructor(private http: HttpClient) {}

  getAllByPage(eventId: number, page: number, searchStr: string = ''): Observable<{ participants: any[], total: number }> {
    return this.http.get<{ participants: any[], total: number }>(`${this.apiUrl}/${eventId}/participants-page?page=${page}&search=${searchStr}`);
  }

  getAll(eventId: number): Observable<any> {
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
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}`;
    return this.http.put(url, eventData);
  }

  createParticipant(eventId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants`;
    return this.http.post(url, eventData);
  }

  getAverageParticipants(): Observable<any> {
    return this.http.get(this.apiUrl + "/participants/average");
  }

  getTotalParticipants(eventId: number): Observable<any> {
    return this.http.get(this.apiUrl + `/${eventId}/participants/total`);
  }

}


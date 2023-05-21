// event.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3001/events';

  constructor(private http: HttpClient) { }

  getEvents(page: number, searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&search=${searchTerm}`);
  }

  getEventsOpen(page: number, searchStr: string = '') {
    return this.http.get<any>(`${this.apiUrl}/open?page=${page}&search=${searchStr}`);
  }

  getEvent(eventId: number): Observable<Event> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<Event>(url);
  }

  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.delete(url);
  }

  createEvent(eventData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, eventData);
  }

  isFull(eventId: number): Observable<boolean> {
    const eventIsFullUrl = `${this.apiUrl}/${eventId}/isfull`;

    return this.http.get<{ is_full: number }[]>(eventIsFullUrl).pipe(
      map(response => response[0].is_full === 1)
    );
  }

  getTotalEvent(): Observable<any> {
    return this.http.get(this.apiUrl + "/total");
  }

}

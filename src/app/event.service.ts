import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventDeleted = new Subject<void>(); // Événement déclenché lors de la suppression d'un événement
  private apiUrl = 'http://localhost:3001/events';

  constructor(private http: HttpClient) { }

  // Récupère la liste des événements avec une pagination et une recherche
  getEvents(page: number, searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&search=${searchTerm}`);
  }

  // Récupère la liste des événements ouverts avec une pagination et une recherche
  getEventsOpen(page: number, searchStr: string = '') {
    return this.http.get<any>(`${this.apiUrl}/open?page=${page}&search=${searchStr}`);
  }

  // Récupère les détails d'un événement spécifique
  getEvent(eventId: number): Observable<Event> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<Event>(url);
  }

  // Supprime un événement spécifique
  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.eventDeleted.next(); // Émet un événement de suppression d'événement
      })
    );
  }

  // Crée un nouvel événement
  createEvent(eventData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, eventData);
  }

  // Vérifie si un événement est complet (au maximum de sa capacité)
  isFull(eventId: number): Observable<boolean> {
    const eventIsFullUrl = `${this.apiUrl}/${eventId}/isfull`;

    return this.http.get<{ is_full: number }[]>(eventIsFullUrl).pipe(
      map(response => response[0].is_full === 1)
    );
  }

  // Récupère le nombre total d'événements
  getTotalEvent(): Observable<any> {
    return this.http.get(this.apiUrl + "/total");
  }
}

// Importation des modules nécessaires depuis Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiUrl = 'http://localhost:3001/events'; // URL de l'API des événements
  participantDeleted = new Subject<void>(); // Événement déclenché lors de la suppression d'un participant

  constructor(private http: HttpClient) {}

  // Récupère tous les participants d'un événement avec pagination et recherche
  getAllByPage(eventId: number, page: number, searchStr: string = ''): Observable<{ participants: any[], total: number }> {
    return this.http.get<{ participants: any[], total: number }>(`${this.apiUrl}/${eventId}/participants-page?page=${page}&search=${searchStr}`);
  }

  // Récupère tous les participants d'un événement
  getAll(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants`;
    return this.http.get(url);
  }

  // Récupère les détails d'un participant spécifique d'un événement
  getParticipant(eventId: number, participantId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}`;
    return this.http.get(url);
  }

  // Supprime un participant spécifique d'un événement
  deleteParticipant(eventId: number, participantId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.participantDeleted.next(); // Émet un événement de suppression de participant
      })
    );
  }

  // Met à jour les informations d'un participant spécifique d'un événement
  updateParticipant(eventId: number, participantId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants/${participantId}`;
    return this.http.put(url, eventData);
  }

  // Crée un nouveau participant pour un événement
  createParticipant(eventId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/participants`;
    return this.http.post(url, eventData);
  }

  // Récupère la moyenne des participants pour tous les événements
  getAverageParticipants(): Observable<any> {
    return this.http.get(this.apiUrl + "/participants/average");
  }

  // Récupère le nombre total de participants pour un événement spécifique
  getTotalParticipants(eventId: number): Observable<any> {
    return this.http.get(this.apiUrl + `/${eventId}/participants/total`);
  }
}
